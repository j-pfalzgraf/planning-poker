/**
 * External Storage Utilities
 *
 * Manages local storage for integration data.
 * All data is stored in the host's browser only.
 */

import type {
    IExternalRef,
    IGitHubConfig,
    IIntegrationConfig,
    IJiraConfig,
    IOAuthToken,
    IStoryExternalLinks,
} from '~/types/integration'
import {
    GITHUB_TOKEN_KEY,
    INTEGRATION_CONFIG_KEY,
    JIRA_TOKEN_KEY,
    getStoryLinksKey,
} from '~/types/integration'

/**
 * Default integration configuration
 */
const DEFAULT_CONFIG: IIntegrationConfig = {
  autoSyncOnNext: true,
  showExternalLinks: true,
}

// ============================================
// Configuration Storage
// ============================================

/**
 * Load integration configuration from localStorage
 */
export function loadIntegrationConfig(): IIntegrationConfig {
  if (typeof window === 'undefined') return DEFAULT_CONFIG

  try {
    const stored = localStorage.getItem(INTEGRATION_CONFIG_KEY)
    if (!stored) return DEFAULT_CONFIG
    return { ...DEFAULT_CONFIG, ...JSON.parse(stored) }
  }
  catch {
    return DEFAULT_CONFIG
  }
}

/**
 * Save integration configuration to localStorage
 */
export function saveIntegrationConfig(config: IIntegrationConfig): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(INTEGRATION_CONFIG_KEY, JSON.stringify(config))
}

/**
 * Update Jira configuration
 */
export function updateJiraConfig(jiraConfig: IJiraConfig): void {
  const config = loadIntegrationConfig()
  config.jira = jiraConfig
  saveIntegrationConfig(config)
}

/**
 * Update GitHub configuration
 */
export function updateGitHubConfig(githubConfig: IGitHubConfig): void {
  const config = loadIntegrationConfig()
  config.github = githubConfig
  saveIntegrationConfig(config)
}

/**
 * Clear all integration configuration
 */
export function clearIntegrationConfig(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(INTEGRATION_CONFIG_KEY)
}

// ============================================
// OAuth Token Storage
// ============================================

/**
 * Load OAuth token from localStorage
 */
export function loadOAuthToken(provider: 'jira' | 'github'): IOAuthToken | null {
  if (typeof window === 'undefined') return null

  try {
    const key = provider === 'jira' ? JIRA_TOKEN_KEY : GITHUB_TOKEN_KEY
    const stored = localStorage.getItem(key)
    if (!stored) return null

    const token = JSON.parse(stored) as IOAuthToken

    // Check if token is expired
    if (token.expiresAt && token.expiresAt < Date.now()) {
      // Token expired - could trigger refresh here
      return token // Return anyway, refresh logic handled elsewhere
    }

    return token
  }
  catch {
    return null
  }
}

/**
 * Save OAuth token to localStorage
 */
export function saveOAuthToken(provider: 'jira' | 'github', token: IOAuthToken): void {
  if (typeof window === 'undefined') return
  const key = provider === 'jira' ? JIRA_TOKEN_KEY : GITHUB_TOKEN_KEY
  localStorage.setItem(key, JSON.stringify(token))
}

/**
 * Clear OAuth token from localStorage
 */
export function clearOAuthToken(provider: 'jira' | 'github'): void {
  if (typeof window === 'undefined') return
  const key = provider === 'jira' ? JIRA_TOKEN_KEY : GITHUB_TOKEN_KEY
  localStorage.removeItem(key)
}

/**
 * Check if a valid token exists for a provider
 */
export function hasValidToken(provider: 'jira' | 'github'): boolean {
  const token = loadOAuthToken(provider)
  if (!token) return false
  // Allow some grace period (5 minutes)
  return token.expiresAt > Date.now() + 5 * 60 * 1000
}

// ============================================
// Story Links Storage
// ============================================

/**
 * Load story links for a session
 */
export function loadStoryLinks(sessionId: string): IStoryExternalLinks | null {
  if (typeof window === 'undefined') return null

  try {
    const key = getStoryLinksKey(sessionId)
    const stored = localStorage.getItem(key)
    if (!stored) return null
    return JSON.parse(stored) as IStoryExternalLinks
  }
  catch {
    return null
  }
}

/**
 * Save story links for a session
 */
export function saveStoryLinks(sessionId: string, links: Record<string, IExternalRef>): void {
  if (typeof window === 'undefined') return

  const data: IStoryExternalLinks = {
    sessionId,
    links,
    updatedAt: Date.now(),
  }

  const key = getStoryLinksKey(sessionId)
  localStorage.setItem(key, JSON.stringify(data))
}

/**
 * Add or update a single story link
 */
export function setStoryLink(sessionId: string, storyId: string, ref: IExternalRef): void {
  const existing = loadStoryLinks(sessionId)
  const links = existing?.links ?? {}
  links[storyId] = ref
  saveStoryLinks(sessionId, links)
}

/**
 * Remove a story link
 */
export function removeStoryLink(sessionId: string, storyId: string): void {
  const existing = loadStoryLinks(sessionId)
  if (!existing) return

  const { [storyId]: _removed, ...remainingLinks } = existing.links
  saveStoryLinks(sessionId, remainingLinks)
}

/**
 * Get a single story link
 */
export function getStoryLink(sessionId: string, storyId: string): IExternalRef | null {
  const existing = loadStoryLinks(sessionId)
  return existing?.links[storyId] ?? null
}

/**
 * Clear all story links for a session
 */
export function clearStoryLinks(sessionId: string): void {
  if (typeof window === 'undefined') return
  const key = getStoryLinksKey(sessionId)
  localStorage.removeItem(key)
}

/**
 * Update sync status for a story link
 */
export function updateStoryLinkSyncStatus(
  sessionId: string,
  storyId: string,
  syncedValue: string,
): void {
  const ref = getStoryLink(sessionId, storyId)
  if (!ref) return

  ref.lastSyncedAt = Date.now()
  ref.syncedValue = syncedValue as IExternalRef['syncedValue']
  setStoryLink(sessionId, storyId, ref)
}

// ============================================
// Cleanup Utilities
// ============================================

/**
 * Clear all integration data (tokens, config, links)
 */
export function clearAllIntegrationData(): void {
  if (typeof window === 'undefined') return

  // Clear config and tokens
  clearIntegrationConfig()
  clearOAuthToken('jira')
  clearOAuthToken('github')

  // Clear all story links (find keys by prefix)
  const keysToRemove: string[] = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key?.startsWith('ppk:integration:links:')) {
      keysToRemove.push(key)
    }
  }
  keysToRemove.forEach(key => localStorage.removeItem(key))
}

/**
 * Export all integration data (for backup)
 */
export function exportIntegrationData(): string {
  const data = {
    config: loadIntegrationConfig(),
    jiraToken: loadOAuthToken('jira'),
    githubToken: loadOAuthToken('github'),
    // Note: Story links are session-specific and not exported
  }
  return JSON.stringify(data, null, 2)
}
