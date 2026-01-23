/**
 * TypeScript Type Definitions for Statistics
 *
 * Types for the local statistics feature with Chart.js visualization.
 */

import type { PokerValue, SessionStatus } from './poker'

/**
 * Vote distribution entry
 */
export interface IVoteDistribution {
  /** Card value */
  value: PokerValue
  /** Number of votes for this value */
  count: number
  /** Percentage of total votes */
  percentage: number
}

/**
 * Statistics for a single story voting round
 */
export interface IStoryStats {
  /** Unique ID */
  id: string
  /** Story title */
  story: string
  /** Story description */
  storyDescription: string | null
  /** Timestamp of the reveal */
  timestamp: Date
  /** Number of participants who voted */
  voterCount: number
  /** Average value (numeric only) */
  average: number | null
  /** Median value (numeric only) */
  median: number | null
  /** Most common value */
  mode: PokerValue | null
  /** Was there consensus? */
  hasConsensus: boolean
  /** Distribution of votes */
  distribution: IVoteDistribution[]
  /** Final estimated value (if assigned) */
  finalEstimate: PokerValue | null
}

/**
 * Aggregated statistics for a session
 */
export interface ISessionStats {
  /** Session ID */
  sessionId: string
  /** Session name */
  sessionName: string
  /** Join code (for reference) */
  joinCode: string
  /** Session creation time */
  createdAt: Date
  /** Last update time */
  updatedAt: Date
  /** History of all voting rounds */
  history: IStoryStats[]
}

/**
 * Quick stats summary (computed from history)
 */
export interface IQuickStats {
  /** Total number of estimated stories */
  totalStories: number
  /** Total story points (sum of numeric estimates) */
  totalPoints: number
  /** Average story points per story */
  averagePoints: number
  /** Consensus rate (percentage of stories with consensus) */
  consensusRate: number
  /** Average number of voters per story */
  averageVotersPerStory: number
}

/**
 * Meeting status (live session info)
 */
export interface IMeetingStatus {
  /** Current session status */
  status: SessionStatus
  /** Current story being estimated */
  currentStory: string | null
  /** Time since voting started (ms) */
  votingDuration: number | null
  /** Participation rate (voters who voted / total voters) */
  participationRate: number
  /** Last activity timestamp */
  lastActivity: Date
  /** Number of participants online */
  participantsOnline: number
  /** Number of stories in queue */
  storiesInQueue: number
  /** Number of stories completed */
  storiesCompleted: number
}

/**
 * Aggregated card frequency across all sessions
 */
export interface ICardFrequency {
  /** Card value */
  value: PokerValue
  /** Total times this card was selected */
  count: number
  /** Percentage of all votes */
  percentage: number
}

/**
 * Time series data point for charts
 */
export interface ITimeSeriesPoint {
  /** Timestamp */
  date: Date
  /** Value (e.g., story points) */
  value: number
  /** Label (e.g., story name) */
  label: string
}

/**
 * Local stats storage structure
 */
export interface ILocalStatsStorage {
  /** Version for migration */
  version: number
  /** All session stats indexed by session ID */
  sessions: Record<string, ISessionStats>
  /** Last updated timestamp */
  lastUpdated: Date
}

/**
 * Default empty storage (deprecated - use createDefaultStatsStorage instead)
 * @deprecated Use createDefaultStatsStorage() to avoid shared mutable state
 */
export const DEFAULT_STATS_STORAGE: ILocalStatsStorage = {
  version: 1,
  sessions: {},
  lastUpdated: new Date(),
}

/**
 * Factory function to create a fresh default storage object.
 * This avoids shared mutable state issues with the constant.
 */
export function createDefaultStatsStorage(): ILocalStatsStorage {
  return {
    version: 1,
    sessions: {},
    lastUpdated: new Date(),
  }
}

/**
 * Storage key for LocalStorage
 */
export const STATS_STORAGE_KEY = 'pp:stats'
