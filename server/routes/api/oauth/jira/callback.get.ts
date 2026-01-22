/**
 * Jira OAuth Callback Endpoint
 *
 * Handles the OAuth callback from Jira.
 * Exchanges authorization code for access token.
 */

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const code = query.code as string
  const stateData = query.state as string
  const error = query.error as string

  if (error) {
    // Redirect back to app with error
    return sendRedirect(event, `/?error=oauth_denied&provider=jira`)
  }

  if (!code || !stateData) {
    throw createError({
      statusCode: 400,
      message: 'Missing code or state parameter',
    })
  }

  // Decode state
  let state: string
  let _cloudUrl: string
  try {
    const decoded = JSON.parse(Buffer.from(stateData, 'base64url').toString())
    state = decoded.state
    _cloudUrl = decoded.cloudUrl // Reserved for future use (e.g., multi-tenant support)
  }
  catch {
    throw createError({
      statusCode: 400,
      message: 'Invalid state parameter',
    })
  }

  // Get OAuth credentials from runtime config
  const config = useRuntimeConfig()
  const clientId = config.jiraClientId
  const clientSecret = config.jiraClientSecret

  if (!clientId || !clientSecret) {
    throw createError({
      statusCode: 500,
      message: 'Jira OAuth not configured',
    })
  }

  // Build callback URL
  const origin = getRequestURL(event).origin
  const redirectUri = `${origin}/api/oauth/jira/callback`

  try {
    // Exchange code for token
    const tokenResponse = await $fetch<{
      access_token: string
      refresh_token?: string
      expires_in: number
      token_type: string
      scope: string
    }>('https://auth.atlassian.com/oauth/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        code,
        redirect_uri: redirectUri,
      },
    })

    // Calculate expiration
    const expiresAt = Date.now() + (tokenResponse.expires_in * 1000)

    // Build token data for client storage
    const tokenData = {
      accessToken: tokenResponse.access_token,
      refreshToken: tokenResponse.refresh_token,
      expiresAt,
      tokenType: tokenResponse.token_type,
      scopes: tokenResponse.scope.split(' '),
    }

    // Encode token data for URL-safe transfer
    const encodedToken = Buffer.from(JSON.stringify(tokenData)).toString('base64url')

    // Redirect back to app with token
    return sendRedirect(event, `/?oauth=success&provider=jira&token=${encodedToken}&state=${state}`)
  }
  catch (err) {
    console.error('[Jira OAuth] Token exchange failed:', err)
    return sendRedirect(event, `/?error=oauth_failed&provider=jira`)
  }
})
