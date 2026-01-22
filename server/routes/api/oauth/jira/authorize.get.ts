/**
 * Jira OAuth Authorization Endpoint
 *
 * Redirects to Jira's OAuth authorization page.
 * OAuth 2.0 (3LO) flow for Jira Cloud.
 */

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const state = query.state as string
  const cloudUrl = query.cloudUrl as string

  if (!state) {
    throw createError({
      statusCode: 400,
      message: 'Missing state parameter',
    })
  }

  // Get OAuth credentials from runtime config
  const config = useRuntimeConfig()
  const clientId = config.jiraClientId

  if (!clientId) {
    throw createError({
      statusCode: 500,
      message: 'Jira OAuth not configured. Set JIRA_CLIENT_ID in environment.',
    })
  }

  // Build callback URL
  const origin = getRequestURL(event).origin
  const redirectUri = `${origin}/api/oauth/jira/callback`

  // Store cloudUrl in state for callback (encoded)
  const stateData = Buffer.from(JSON.stringify({ state, cloudUrl })).toString('base64url')

  // Jira OAuth scopes
  const scopes = [
    'read:jira-work',
    'write:jira-work',
    'read:jira-user',
    'offline_access',
  ].join(' ')

  // Build authorization URL
  const authUrl = new URL('https://auth.atlassian.com/authorize')
  authUrl.searchParams.set('audience', 'api.atlassian.com')
  authUrl.searchParams.set('client_id', clientId)
  authUrl.searchParams.set('scope', scopes)
  authUrl.searchParams.set('redirect_uri', redirectUri)
  authUrl.searchParams.set('state', stateData)
  authUrl.searchParams.set('response_type', 'code')
  authUrl.searchParams.set('prompt', 'consent')

  // Redirect to Jira
  return sendRedirect(event, authUrl.toString())
})
