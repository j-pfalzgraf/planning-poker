/**
 * GitHub OAuth Callback Endpoint
 *
 * Handles the OAuth callback from GitHub.
 * Exchanges authorization code for access token.
 */

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const code = query.code as string
  const state = query.state as string
  const error = query.error as string

  if (error) {
    // Redirect back to app with error
    return sendRedirect(event, `/?error=oauth_denied&provider=github`)
  }

  if (!code || !state) {
    throw createError({
      statusCode: 400,
      message: 'Missing code or state parameter',
    })
  }

  // Get OAuth credentials from runtime config
  const config = useRuntimeConfig()
  const clientId = config.githubClientId
  const clientSecret = config.githubClientSecret

  if (!clientId || !clientSecret) {
    throw createError({
      statusCode: 500,
      message: 'GitHub OAuth not configured',
    })
  }

  try {
    // Exchange code for token
    const tokenResponse = await $fetch<{
      access_token: string
      token_type: string
      scope: string
    }>('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: {
        client_id: clientId,
        client_secret: clientSecret,
        code,
      },
    })

    if (!tokenResponse.access_token) {
      throw new Error('No access token in response')
    }

    // GitHub tokens don't expire by default
    const expiresAt = Date.now() + (365 * 24 * 60 * 60 * 1000) // 1 year

    // Build token data for client storage
    const tokenData = {
      accessToken: tokenResponse.access_token,
      expiresAt,
      tokenType: tokenResponse.token_type,
      scopes: tokenResponse.scope.split(','),
    }

    // Encode token data for URL-safe transfer
    const encodedToken = Buffer.from(JSON.stringify(tokenData)).toString('base64url')

    // Redirect back to app with token
    return sendRedirect(event, `/?oauth=success&provider=github&token=${encodedToken}&state=${state}`)
  }
  catch (err) {
    console.error('[GitHub OAuth] Token exchange failed:', err)
    return sendRedirect(event, `/?error=oauth_failed&provider=github`)
  }
})
