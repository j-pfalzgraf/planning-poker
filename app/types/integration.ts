/**
 * Integration Types for External Issue Trackers
 *
 * Defines interfaces for Jira Cloud and GitHub integrations.
 * All data is stored locally in the host's browser.
 */

import type { PokerValue } from './poker'

/**
 * Supported integration providers
 */
export type IntegrationProvider = 'jira' | 'github-issues' | 'github-projects'

/**
 * OAuth token data (stored locally in browser)
 */
export interface IOAuthToken {
  /** Access token */
  accessToken: string
  /** Refresh token (if available) */
  refreshToken?: string
  /** Token expiration timestamp */
  expiresAt: number
  /** Token type (usually "Bearer") */
  tokenType: string
  /** OAuth scopes granted */
  scopes: string[]
}

/**
 * Jira Cloud configuration
 */
export interface IJiraConfig {
  /** Jira Cloud instance URL (e.g., https://mycompany.atlassian.net) */
  cloudUrl: string
  /** Story Points custom field ID (e.g., customfield_10016) */
  storyPointsFieldId: string
  /** Default JQL filter for importing stories */
  defaultJql?: string
  /** Selected project key */
  projectKey?: string
}

/**
 * GitHub configuration
 */
export interface IGitHubConfig {
  /** Repository owner */
  owner: string
  /** Repository name */
  repo: string
  /** GitHub Projects v2 project number (optional) */
  projectNumber?: number
  /** GitHub Projects v2 field ID for story points (optional) */
  storyPointsFieldId?: string
  /** Default label filter */
  defaultLabels?: string[]
}

/**
 * Full integration configuration (stored locally)
 */
export interface IIntegrationConfig {
  /** Jira configuration (if connected) */
  jira?: IJiraConfig
  /** GitHub configuration (if connected) */
  github?: IGitHubConfig
  /** Auto-sync story points on "Next Story" */
  autoSyncOnNext: boolean
  /** Show external links in UI */
  showExternalLinks: boolean
}

/**
 * Reference to an external issue/story
 */
export interface IExternalRef {
  /** Integration provider */
  provider: IntegrationProvider
  /** External issue ID or key */
  externalId: string
  /** External issue key (e.g., PROJ-123 for Jira) */
  externalKey: string
  /** Direct URL to the issue */
  url: string
  /** Project identifier */
  projectId?: string
  /** Last sync timestamp */
  lastSyncedAt?: number
  /** Synced story points value */
  syncedValue?: PokerValue
}

/**
 * Mapping of internal story IDs to external references
 * Stored per session in localStorage
 */
export interface IStoryExternalLinks {
  /** Session ID this mapping belongs to */
  sessionId: string
  /** Map of storyId -> external reference */
  links: Record<string, IExternalRef>
  /** Last updated timestamp */
  updatedAt: number
}

/**
 * External issue data from Jira/GitHub
 */
export interface IExternalIssue {
  /** External issue ID */
  id: string
  /** External issue key (e.g., PROJ-123) */
  key: string
  /** Issue title/summary */
  title: string
  /** Issue description (HTML or Markdown) */
  description?: string
  /** Labels/tags */
  labels: string[]
  /** Direct URL */
  url: string
  /** Current story points (if set) */
  storyPoints?: number
  /** Issue status */
  status?: string
  /** Issue type (e.g., Story, Task, Bug) */
  type?: string
  /** Provider this issue comes from */
  provider: IntegrationProvider
}

/**
 * Import filter options
 */
export interface IImportFilter {
  /** Provider to import from */
  provider: IntegrationProvider
  /** Jira JQL query */
  jql?: string
  /** GitHub label filter */
  labels?: string[]
  /** GitHub issue state filter */
  state?: 'open' | 'closed' | 'all'
  /** GitHub milestone filter */
  milestone?: string
  /** Max results to fetch */
  limit?: number
}

/**
 * Sync result for a single story
 */
export interface ISyncResult {
  /** Story ID */
  storyId: string
  /** External reference */
  externalRef: IExternalRef
  /** Sync success */
  success: boolean
  /** Error message if failed */
  error?: string
  /** Synced value */
  value?: PokerValue
}

/**
 * Integration connection status
 */
export interface IIntegrationStatus {
  /** Provider */
  provider: IntegrationProvider
  /** Is connected (has valid token) */
  connected: boolean
  /** Connection error */
  error?: string
  /** User info (if connected) */
  user?: {
    id: string
    name: string
    email?: string
    avatarUrl?: string
  }
}

// ============================================
// Storage Keys
// ============================================

/** LocalStorage key prefix for integration data */
export const INTEGRATION_STORAGE_PREFIX = 'ppk:integration'

/** Key for integration config */
export const INTEGRATION_CONFIG_KEY = `${INTEGRATION_STORAGE_PREFIX}:config`

/** Key for Jira OAuth token */
export const JIRA_TOKEN_KEY = `${INTEGRATION_STORAGE_PREFIX}:jira:token`

/** Key for GitHub OAuth token */
export const GITHUB_TOKEN_KEY = `${INTEGRATION_STORAGE_PREFIX}:github:token`

/**
 * Get storage key for session story links
 */
export function getStoryLinksKey(sessionId: string): string {
  return `${INTEGRATION_STORAGE_PREFIX}:links:${sessionId}`
}

// ============================================
// Validation Helpers
// ============================================

/**
 * Checks if a PokerValue is numeric and can be synced
 */
export function isNumericPokerValue(value: PokerValue): boolean {
  const numValue = Number.parseFloat(value)
  return !Number.isNaN(numValue)
}

/**
 * Converts a PokerValue to a number for API sync
 * Returns null for non-numeric values
 */
export function pokerValueToNumber(value: PokerValue): number | null {
  if (!isNumericPokerValue(value)) return null
  return Number.parseFloat(value)
}

/**
 * Validates a Jira field ID format
 */
export function isValidJiraFieldId(fieldId: string): boolean {
  return /^customfield_\d+$/.test(fieldId)
}

/**
 * Validates a GitHub repo format (owner/repo)
 */
export function isValidGitHubRepo(repo: string): boolean {
  return /^[\w.-]+\/[\w.-]+$/.test(repo)
}
