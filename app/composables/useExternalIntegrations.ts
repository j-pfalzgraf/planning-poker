/**
 * useExternalIntegrations Composable
 *
 * Manages external integrations (Jira, GitHub) for importing stories
 * and syncing story points. All data is stored locally in the host's browser.
 */

import type {
    IExternalIssue,
    IExternalRef,
    IGitHubConfig,
    IImportFilter,
    IIntegrationConfig,
    IIntegrationStatus,
    IJiraConfig,
    IOAuthToken,
    ISyncResult,
    IntegrationProvider,
} from '~/types/integration'
import {
    isNumericPokerValue,
    pokerValueToNumber,
} from '~/types/integration'
import type { PokerValue } from '~/types/poker'
import {
    clearOAuthToken,
    getStoryLink,
    hasValidToken,
    loadIntegrationConfig,
    loadOAuthToken,
    saveIntegrationConfig,
    saveOAuthToken,
    setStoryLink,
    updateStoryLinkSyncStatus,
} from '~/utils/externalStorage'

/**
 * Composable for managing external integrations
 */
export function useExternalIntegrations() {
  // ============================================
  // Reactive State
  // ============================================

  /** Integration configuration */
  const config = ref<IIntegrationConfig>(loadIntegrationConfig())

  /** Jira connection status */
  const jiraStatus = ref<IIntegrationStatus>({
    provider: 'jira',
    connected: false,
  })

  /** GitHub connection status */
  const githubStatus = ref<IIntegrationStatus>({
    provider: 'github-issues',
    connected: false,
  })

  /** Loading state for operations */
  const isLoading = ref(false)

  /** Current error message */
  const error = ref<string | null>(null)

  /** Fetched issues for import */
  const fetchedIssues = ref<IExternalIssue[]>([])

  // ============================================
  // Computed Properties
  // ============================================

  /** Is Jira connected */
  const isJiraConnected = computed(() => jiraStatus.value.connected)

  /** Is GitHub connected */
  const isGitHubConnected = computed(() => githubStatus.value.connected)

  /** Has any integration configured */
  const hasAnyIntegration = computed(() =>
    isJiraConnected.value || isGitHubConnected.value
  )

  /** Jira configuration */
  const jiraConfig = computed(() => config.value.jira)

  /** GitHub configuration */
  const githubConfig = computed(() => config.value.github)

  // ============================================
  // Initialization
  // ============================================

  /**
   * Initialize connection status on mount
   */
  function initialize(): void {
    if (import.meta.client) {
      config.value = loadIntegrationConfig()
      checkConnectionStatus()
    }
  }

  /**
   * Check connection status for all providers
   */
  function checkConnectionStatus(): void {
    // Check Jira
    if (hasValidToken('jira') && config.value.jira) {
      jiraStatus.value = {
        provider: 'jira',
        connected: true,
      }
    }
    else {
      jiraStatus.value = {
        provider: 'jira',
        connected: false,
      }
    }

    // Check GitHub
    if (hasValidToken('github') && config.value.github) {
      githubStatus.value = {
        provider: 'github-issues',
        connected: true,
      }
    }
    else {
      githubStatus.value = {
        provider: 'github-issues',
        connected: false,
      }
    }
  }

  // ============================================
  // OAuth Flow
  // ============================================

  /**
   * Start OAuth flow for Jira
   */
  async function connectJira(jiraConfig: IJiraConfig): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      // Save config first
      config.value.jira = jiraConfig
      saveIntegrationConfig(config.value)

      // Generate state for CSRF protection
      const state = crypto.randomUUID()
      sessionStorage.setItem('jira_oauth_state', state)

      // Redirect to OAuth endpoint
      const authUrl = `/api/oauth/jira/authorize?state=${state}&cloudUrl=${encodeURIComponent(jiraConfig.cloudUrl)}`
      window.location.href = authUrl

      return true
    }
    catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to connect to Jira'
      return false
    }
    finally {
      isLoading.value = false
    }
  }

  /**
   * Start OAuth flow for GitHub
   */
  async function connectGitHub(githubConfig: IGitHubConfig): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      // Save config first
      config.value.github = githubConfig
      saveIntegrationConfig(config.value)

      // Generate state for CSRF protection
      const state = crypto.randomUUID()
      sessionStorage.setItem('github_oauth_state', state)

      // Redirect to OAuth endpoint
      const authUrl = `/api/oauth/github/authorize?state=${state}`
      window.location.href = authUrl

      return true
    }
    catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to connect to GitHub'
      return false
    }
    finally {
      isLoading.value = false
    }
  }

  /**
   * Handle OAuth callback (called from callback page)
   */
  async function handleOAuthCallback(
    provider: 'jira' | 'github',
    code: string,
    state: string,
  ): Promise<boolean> {
    isLoading.value = true
    error.value = null

    try {
      // Verify state
      const savedState = sessionStorage.getItem(`${provider}_oauth_state`)
      if (state !== savedState) {
        throw new Error('Invalid OAuth state')
      }
      sessionStorage.removeItem(`${provider}_oauth_state`)

      // Exchange code for token
      const response = await $fetch<{ token: IOAuthToken }>(`/api/oauth/${provider}/callback`, {
        method: 'POST',
        body: { code, state },
      })

      if (!response.token) {
        throw new Error('No token received')
      }

      // Save token locally
      saveOAuthToken(provider, response.token)

      // Update connection status
      checkConnectionStatus()

      return true
    }
    catch (e) {
      error.value = e instanceof Error ? e.message : 'OAuth callback failed'
      return false
    }
    finally {
      isLoading.value = false
    }
  }

  /**
   * Disconnect a provider
   */
  function disconnect(provider: 'jira' | 'github'): void {
    clearOAuthToken(provider)

    if (provider === 'jira') {
      config.value.jira = undefined
      jiraStatus.value = { provider: 'jira', connected: false }
    }
    else {
      config.value.github = undefined
      githubStatus.value = { provider: 'github-issues', connected: false }
    }

    saveIntegrationConfig(config.value)
  }

  // ============================================
  // Import Issues
  // ============================================

  /**
   * Fetch issues from external provider
   */
  async function fetchIssues(filter: IImportFilter): Promise<IExternalIssue[]> {
    isLoading.value = true
    error.value = null
    fetchedIssues.value = []

    try {
      const token = loadOAuthToken(filter.provider === 'jira' ? 'jira' : 'github')
      if (!token) {
        throw new Error(`Not connected to ${filter.provider}`)
      }

      let issues: IExternalIssue[] = []

      if (filter.provider === 'jira') {
        issues = await fetchJiraIssues(token, filter)
      }
      else {
        issues = await fetchGitHubIssues(token, filter)
      }

      fetchedIssues.value = issues
      return issues
    }
    catch (e) {
      error.value = e instanceof Error ? e.message : 'Failed to fetch issues'
      return []
    }
    finally {
      isLoading.value = false
    }
  }

  /**
   * Fetch issues from Jira
   */
  async function fetchJiraIssues(
    token: IOAuthToken,
    filter: IImportFilter,
  ): Promise<IExternalIssue[]> {
    const jira = config.value.jira
    if (!jira) throw new Error('Jira not configured')

    const jql = filter.jql || jira.defaultJql || `project = "${jira.projectKey}" AND issuetype = Story ORDER BY created DESC`

    const response = await $fetch<{
      issues: Array<{
        id: string
        key: string
        fields: {
          summary: string
          description?: string
          labels?: string[]
          status?: { name: string }
          issuetype?: { name: string }
          [key: string]: unknown
        }
      }>
    }>(`${jira.cloudUrl}/rest/api/3/search`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: {
        jql,
        maxResults: filter.limit || 50,
        fields: ['summary', 'description', 'labels', 'status', 'issuetype', jira.storyPointsFieldId],
      },
    })

    return response.issues.map((issue) => {
      const storyPointsValue = issue.fields[jira.storyPointsFieldId]
      return {
        id: issue.id,
        key: issue.key,
        title: issue.fields.summary,
        description: typeof issue.fields.description === 'string' ? issue.fields.description : undefined,
        labels: issue.fields.labels || [],
        url: `${jira.cloudUrl}/browse/${issue.key}`,
        storyPoints: typeof storyPointsValue === 'number' ? storyPointsValue : undefined,
        status: issue.fields.status?.name,
        type: issue.fields.issuetype?.name,
        provider: 'jira' as IntegrationProvider,
      }
    })
  }

  /**
   * Fetch issues from GitHub
   */
  async function fetchGitHubIssues(
    token: IOAuthToken,
    filter: IImportFilter,
  ): Promise<IExternalIssue[]> {
    const github = config.value.github
    if (!github) throw new Error('GitHub not configured')

    const params = new URLSearchParams({
      state: filter.state || 'open',
      per_page: String(filter.limit || 50),
    })

    if (filter.labels?.length) {
      params.set('labels', filter.labels.join(','))
    }

    const response = await $fetch<Array<{
      id: number
      number: number
      title: string
      body?: string
      labels: Array<{ name: string }>
      state: string
      html_url: string
    }>>(`https://api.github.com/repos/${github.owner}/${github.repo}/issues?${params}`, {
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        Accept: 'application/vnd.github.v3+json',
      },
    })

    return response
      .filter(issue => !('pull_request' in issue)) // Exclude PRs
      .map(issue => ({
        id: String(issue.id),
        key: `#${issue.number}`,
        title: issue.title,
        description: issue.body,
        labels: issue.labels.map(l => l.name),
        url: issue.html_url,
        status: issue.state,
        provider: (filter.provider === 'github-projects' ? 'github-projects' : 'github-issues') as IntegrationProvider,
      }))
  }

  // ============================================
  // Story Points Sync
  // ============================================

  /**
   * Sync story points to external provider
   * Called when "Next Story" is triggered
   */
  async function syncStoryPoints(
    sessionId: string,
    storyId: string,
    value: PokerValue,
  ): Promise<ISyncResult> {
    const externalRef = getStoryLink(sessionId, storyId)

    if (!externalRef) {
      return {
        storyId,
        externalRef: null as unknown as IExternalRef,
        success: false,
        error: 'No external link found for this story',
      }
    }

    // Check if value is numeric
    if (!isNumericPokerValue(value)) {
      return {
        storyId,
        externalRef,
        success: false,
        error: `Cannot sync non-numeric value: ${value}`,
      }
    }

    const numericValue = pokerValueToNumber(value)
    if (numericValue === null) {
      return {
        storyId,
        externalRef,
        success: false,
        error: 'Invalid numeric value',
      }
    }

    try {
      if (externalRef.provider === 'jira') {
        await syncToJira(externalRef, numericValue)
      }
      else {
        await syncToGitHub(externalRef, numericValue)
      }

      // Update local sync status
      updateStoryLinkSyncStatus(sessionId, storyId, value)

      return {
        storyId,
        externalRef,
        success: true,
        value,
      }
    }
    catch (e) {
      return {
        storyId,
        externalRef,
        success: false,
        error: e instanceof Error ? e.message : 'Sync failed',
      }
    }
  }

  /**
   * Sync story points to Jira
   */
  async function syncToJira(ref: IExternalRef, value: number): Promise<void> {
    const token = loadOAuthToken('jira')
    const jira = config.value.jira
    if (!token || !jira) throw new Error('Jira not configured')

    await $fetch(`${jira.cloudUrl}/rest/api/3/issue/${ref.externalId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: {
        fields: {
          [jira.storyPointsFieldId]: value,
        },
      },
    })
  }

  /**
   * Sync story points to GitHub (via labels or Projects v2)
   */
  async function syncToGitHub(ref: IExternalRef, value: number): Promise<void> {
    const token = loadOAuthToken('github')
    const github = config.value.github
    if (!token || !github) throw new Error('GitHub not configured')

    if (ref.provider === 'github-projects' && github.projectNumber && github.storyPointsFieldId) {
      // Update via GitHub Projects v2 GraphQL API
      await syncToGitHubProjects(token, ref, value, github)
    }
    else {
      // Fallback: Add label with story points
      const issueNumber = ref.externalKey.replace('#', '')

      // Get current labels
      const issue = await $fetch<{ labels: Array<{ name: string }> }>(
        `https://api.github.com/repos/${github.owner}/${github.repo}/issues/${issueNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
            Accept: 'application/vnd.github.v3+json',
          },
        }
      )

      // Remove old story points labels, add new one
      const storyPointsLabelPrefix = 'story-points:'
      const newLabels = issue.labels
        .map(l => l.name)
        .filter(name => !name.startsWith(storyPointsLabelPrefix))

      newLabels.push(`${storyPointsLabelPrefix}${value}`)

      await $fetch(
        `https://api.github.com/repos/${github.owner}/${github.repo}/issues/${issueNumber}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
            Accept: 'application/vnd.github.v3+json',
          },
          body: { labels: newLabels },
        }
      )
    }
  }

  /**
   * Sync to GitHub Projects v2 using GraphQL
   */
  async function syncToGitHubProjects(
    token: IOAuthToken,
    ref: IExternalRef,
    value: number,
    github: IGitHubConfig,
  ): Promise<void> {
    // GraphQL mutation to update project field
    const mutation = `
      mutation($projectId: ID!, $itemId: ID!, $fieldId: ID!, $value: Float!) {
        updateProjectV2ItemFieldValue(
          input: {
            projectId: $projectId
            itemId: $itemId
            fieldId: $fieldId
            value: { number: $value }
          }
        ) {
          projectV2Item { id }
        }
      }
    `

    await $fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: {
        query: mutation,
        variables: {
          projectId: ref.projectId,
          itemId: ref.externalId,
          fieldId: github.storyPointsFieldId,
          value,
        },
      },
    })
  }

  // ============================================
  // Configuration Updates
  // ============================================

  /**
   * Update integration settings
   */
  function updateSettings(settings: Partial<IIntegrationConfig>): void {
    config.value = { ...config.value, ...settings }
    saveIntegrationConfig(config.value)
  }

  /**
   * Update Jira story points field ID
   */
  function setJiraStoryPointsField(fieldId: string): void {
    if (!config.value.jira) return
    config.value.jira.storyPointsFieldId = fieldId
    saveIntegrationConfig(config.value)
  }

  /**
   * Update GitHub Projects field ID
   */
  function setGitHubStoryPointsField(fieldId: string): void {
    if (!config.value.github) return
    config.value.github.storyPointsFieldId = fieldId
    saveIntegrationConfig(config.value)
  }

  /**
   * Create external reference from imported issue
   */
  function createExternalRef(
    issue: IExternalIssue,
    projectId?: string,
  ): IExternalRef {
    return {
      provider: issue.provider,
      externalId: issue.id,
      externalKey: issue.key,
      url: issue.url,
      projectId,
    }
  }

  /**
   * Link a story to an external issue
   */
  function linkStoryToIssue(
    sessionId: string,
    storyId: string,
    issue: IExternalIssue,
    projectId?: string,
  ): void {
    const ref = createExternalRef(issue, projectId)
    setStoryLink(sessionId, storyId, ref)
  }

  // ============================================
  // Lifecycle
  // ============================================

  // Initialize on client
  if (import.meta.client) {
    initialize()
  }

  return {
    // State
    config: readonly(config),
    jiraStatus: readonly(jiraStatus),
    githubStatus: readonly(githubStatus),
    isLoading: readonly(isLoading),
    error: readonly(error),
    fetchedIssues: readonly(fetchedIssues),

    // Computed
    isJiraConnected,
    isGitHubConnected,
    hasAnyIntegration,
    jiraConfig,
    githubConfig,

    // OAuth
    connectJira,
    connectGitHub,
    handleOAuthCallback,
    disconnect,

    // Import
    fetchIssues,

    // Sync
    syncStoryPoints,

    // Configuration
    updateSettings,
    setJiraStoryPointsField,
    setGitHubStoryPointsField,
    linkStoryToIssue,

    // Utilities
    checkConnectionStatus,
    createExternalRef,
  }
}
