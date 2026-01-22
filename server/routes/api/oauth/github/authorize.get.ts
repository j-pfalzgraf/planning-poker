/**
 * GitHub OAuth Authorization Endpoint
 *
 * Redirects to GitHub's OAuth authorization page.
 */

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const state = query.state as string

  if (!state) {
    throw createError({
      statusCode: 400,
      message: 'Missing state parameter',
    })
  }

  // Get OAuth credentials from runtime config
  const config = useRuntimeConfig()
  const clientId = config.githubClientId

  if (!clientId) {
    throw createError({
      statusCode: 500,
      message: 'GitHub OAuth not configured. Set GITHUB_CLIENT_ID in environment.',
    })
  }

  // Build callback URL
  const origin = getRequestURL(event).origin
  const redirectUri = `${origin}/api/oauth/github/callback`

  // GitHub OAuth scopes
  const scopes = [
    'repo',
    'read:org',
    'read:project',
    'project',
  ].join(' ')

  // Build authorization URL
  const authUrl = new URL('https://github.com/login/oauth/authorize')
  authUrl.searchParams.set('client_id', clientId)
  authUrl.searchParams.set('scope', scopes)
  authUrl.searchParams.set('redirect_uri', redirectUri)
  authUrl.searchParams.set('state', state)

  // Redirect to GitHub
  return sendRedirect(event, authUrl.toString())
})
