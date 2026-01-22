/**
 * useLocalStats Composable
 *
 * Manages local statistics storage and provides computed statistics.
 * Uses LocalStorage for persistence across browser sessions.
 */

import type { IParticipant, ISession, PokerValue } from '~/types'
import type {
    ICardFrequency,
    ILocalStatsStorage,
    IMeetingStatus,
    IQuickStats,
    ISessionStats,
    IStoryStats,
    ITimeSeriesPoint,
    IVoteDistribution,
} from '~/types/stats'
import { DEFAULT_STATS_STORAGE, STATS_STORAGE_KEY } from '~/types/stats'

/**
 * Composable for managing local statistics
 */
export function useLocalStats() {
  /**
   * Reactive storage state
   */
  const storage = useState<ILocalStatsStorage>('localStats', () => DEFAULT_STATS_STORAGE)

  /**
   * Initialize storage from LocalStorage on client
   */
  function initStorage(): void {
    if (!import.meta.client) return

    try {
      const stored = localStorage.getItem(STATS_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as ILocalStatsStorage
        // Convert date strings back to Date objects
        parsed.lastUpdated = new Date(parsed.lastUpdated)
        Object.values(parsed.sessions).forEach((session) => {
          session.createdAt = new Date(session.createdAt)
          session.updatedAt = new Date(session.updatedAt)
          session.history.forEach((story) => {
            story.timestamp = new Date(story.timestamp)
          })
        })
        storage.value = parsed
      }
    }
    catch (error) {
      console.error('[useLocalStats] Failed to load stats from storage:', error)
    }
  }

  /**
   * Save storage to LocalStorage
   */
  function saveStorage(): void {
    if (!import.meta.client) return

    try {
      storage.value.lastUpdated = new Date()
      localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(storage.value))
    }
    catch (error) {
      console.error('[useLocalStats] Failed to save stats to storage:', error)
    }
  }

  /**
   * Get or create session stats
   */
  function getOrCreateSessionStats(session: ISession, joinCode: string): ISessionStats {
    if (!storage.value.sessions[session.id]) {
      storage.value.sessions[session.id] = {
        sessionId: session.id,
        sessionName: session.name,
        joinCode,
        createdAt: new Date(session.createdAt),
        updatedAt: new Date(),
        history: [],
      }
    }
    return storage.value.sessions[session.id]!
  }

  /**
   * Record a voting result (called when cards are revealed)
   */
  function recordVotingResult(
    session: ISession,
    joinCode: string,
    voters: IParticipant[],
  ): IStoryStats | null {
    if (!session.currentStory || !session.cardsRevealed) return null

    const sessionStats = getOrCreateSessionStats(session, joinCode)

    // Calculate distribution
    const voteCounts = new Map<PokerValue, number>()
    const numericValues: number[] = []

    voters.forEach((voter) => {
      if (voter.selectedValue !== null) {
        const value = voter.selectedValue
        voteCounts.set(value, (voteCounts.get(value) || 0) + 1)

        const numValue = Number.parseFloat(value)
        if (!Number.isNaN(numValue)) {
          numericValues.push(numValue)
        }
      }
    })

    const totalVotes = voters.filter(v => v.selectedValue !== null).length
    const distribution: IVoteDistribution[] = Array.from(voteCounts.entries())
      .map(([value, count]) => ({
        value,
        count,
        percentage: totalVotes > 0 ? (count / totalVotes) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count)

    // Calculate statistics
    const average = numericValues.length > 0
      ? numericValues.reduce((a, b) => a + b, 0) / numericValues.length
      : null

    const median = calculateMedian(numericValues)
    const mode = distribution.length > 0 ? distribution[0]?.value ?? null : null
    const hasConsensus = distribution.length === 1 && totalVotes > 1

    const storyStats: IStoryStats = {
      id: crypto.randomUUID(),
      story: session.currentStory,
      storyDescription: session.currentStoryDescription,
      timestamp: new Date(),
      voterCount: totalVotes,
      average,
      median,
      mode,
      hasConsensus,
      distribution,
      finalEstimate: mode, // Default to mode
    }

    // Check if this story was already recorded (avoid duplicates)
    const existingIndex = sessionStats.history.findIndex(
      h => h.story === storyStats.story
        && Math.abs(h.timestamp.getTime() - storyStats.timestamp.getTime()) < 60000
    )

    if (existingIndex === -1) {
      sessionStats.history.push(storyStats)
      sessionStats.updatedAt = new Date()
      saveStorage()
    }

    return storyStats
  }

  /**
   * Calculate median of numeric values
   */
  function calculateMedian(values: number[]): number | null {
    if (values.length === 0) return null

    const sorted = [...values].sort((a, b) => a - b)
    const mid = Math.floor(sorted.length / 2)

    if (sorted.length % 2 !== 0) {
      return sorted[mid] ?? null
    }

    const left = sorted[mid - 1]
    const right = sorted[mid]
    if (left === undefined || right === undefined) return null
    return (left + right) / 2
  }

  /**
   * Get quick stats for a session
   */
  function getQuickStats(sessionId?: string): IQuickStats {
    const sessions = sessionId
      ? [storage.value.sessions[sessionId]].filter(Boolean)
      : Object.values(storage.value.sessions)

    const allStories = sessions.flatMap(s => s?.history ?? [])

    if (allStories.length === 0) {
      return {
        totalStories: 0,
        totalPoints: 0,
        averagePoints: 0,
        consensusRate: 0,
        averageVotersPerStory: 0,
      }
    }

    const numericEstimates = allStories
      .map(s => s.finalEstimate)
      .filter((v): v is PokerValue => v !== null)
      .map(v => Number.parseFloat(v))
      .filter(v => !Number.isNaN(v))

    const totalPoints = numericEstimates.reduce((a, b) => a + b, 0)
    const consensusCount = allStories.filter(s => s.hasConsensus).length
    const totalVoters = allStories.reduce((sum, s) => sum + s.voterCount, 0)

    return {
      totalStories: allStories.length,
      totalPoints,
      averagePoints: numericEstimates.length > 0 ? totalPoints / numericEstimates.length : 0,
      consensusRate: (consensusCount / allStories.length) * 100,
      averageVotersPerStory: totalVoters / allStories.length,
    }
  }

  /**
   * Get meeting status from current session
   */
  function getMeetingStatus(session: ISession | null, voters: IParticipant[]): IMeetingStatus {
    if (!session) {
      return {
        status: 'waiting',
        currentStory: null,
        votingDuration: null,
        participationRate: 0,
        lastActivity: new Date(),
        participantsOnline: 0,
        storiesInQueue: 0,
        storiesCompleted: 0,
      }
    }

    const votedCount = voters.filter(v => v.selectedValue !== null).length
    const participationRate = voters.length > 0 ? (votedCount / voters.length) * 100 : 0

    const sessionStats = storage.value.sessions[session.id]
    const storiesCompleted = sessionStats?.history.length ?? 0

    return {
      status: session.status,
      currentStory: session.currentStory,
      votingDuration: null, // TODO: Track voting start time
      participationRate,
      lastActivity: new Date(session.updatedAt),
      participantsOnline: session.participants.length,
      storiesInQueue: session.storyQueue.length,
      storiesCompleted,
    }
  }

  /**
   * Get card frequency across all sessions
   */
  function getCardFrequency(sessionId?: string): ICardFrequency[] {
    const sessions = sessionId
      ? [storage.value.sessions[sessionId]].filter(Boolean)
      : Object.values(storage.value.sessions)

    const frequency = new Map<PokerValue, number>()
    let total = 0

    sessions.forEach((session) => {
      session?.history.forEach((story) => {
        story.distribution.forEach((dist) => {
          frequency.set(dist.value, (frequency.get(dist.value) || 0) + dist.count)
          total += dist.count
        })
      })
    })

    return Array.from(frequency.entries())
      .map(([value, count]) => ({
        value,
        count,
        percentage: total > 0 ? (count / total) * 100 : 0,
      }))
      .sort((a, b) => b.count - a.count)
  }

  /**
   * Get time series data for story points over time
   */
  function getPointsTimeSeries(sessionId?: string): ITimeSeriesPoint[] {
    const sessions = sessionId
      ? [storage.value.sessions[sessionId]].filter(Boolean)
      : Object.values(storage.value.sessions)

    return sessions
      .flatMap(s => s?.history ?? [])
      .filter(story => story.average !== null)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime())
      .map(story => ({
        date: story.timestamp,
        value: story.average!,
        label: story.story,
      }))
  }

  /**
   * Get recent stories (last N)
   */
  function getRecentStories(sessionId?: string, limit = 10): IStoryStats[] {
    const sessions = sessionId
      ? [storage.value.sessions[sessionId]].filter(Boolean)
      : Object.values(storage.value.sessions)

    return sessions
      .flatMap(s => s?.history ?? [])
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit)
  }

  /**
   * Get consensus distribution (pie chart data)
   */
  function getConsensusDistribution(sessionId?: string): { consensus: number, noConsensus: number } {
    const sessions = sessionId
      ? [storage.value.sessions[sessionId]].filter(Boolean)
      : Object.values(storage.value.sessions)

    const allStories = sessions.flatMap(s => s?.history ?? [])
    const consensus = allStories.filter(s => s.hasConsensus).length
    const noConsensus = allStories.length - consensus

    return { consensus, noConsensus }
  }

  /**
   * Get all session stats
   */
  function getAllSessions(): ISessionStats[] {
    return Object.values(storage.value.sessions)
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
  }

  /**
   * Get session stats by ID
   */
  function getSessionStats(sessionId: string): ISessionStats | null {
    return storage.value.sessions[sessionId] ?? null
  }

  /**
   * Clear all stats
   */
  function clearAllStats(): void {
    storage.value = { ...DEFAULT_STATS_STORAGE }
    saveStorage()
  }

  /**
   * Clear stats for a specific session
   */
  function clearSessionStats(sessionId: string): void {
    const { [sessionId]: _, ...rest } = storage.value.sessions
    storage.value.sessions = rest
    saveStorage()
  }

  // Initialize on client
  if (import.meta.client) {
    initStorage()
  }

  return {
    // State
    storage: readonly(storage),

    // Actions
    initStorage,
    recordVotingResult,
    clearAllStats,
    clearSessionStats,

    // Computed stats
    getQuickStats,
    getMeetingStatus,
    getCardFrequency,
    getPointsTimeSeries,
    getRecentStories,
    getConsensusDistribution,
    getAllSessions,
    getSessionStats,
  }
}
