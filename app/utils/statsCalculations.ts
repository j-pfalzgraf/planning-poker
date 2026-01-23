/**
 * Pure Statistics Calculation Functions
 *
 * These functions contain the core statistics logic without
 * any framework dependencies, making them easy to test.
 */

import type { IParticipant, PokerValue } from '../types'
import type { IStoryStats, IVoteDistribution } from '../types/stats'

/**
 * Calculate median of numeric values
 *
 * @param values - Array of numeric values
 * @returns Median value or null if empty
 */
export function calculateMedian(values: number[]): number | null {
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
 * Calculate vote distribution from voters
 *
 * @param voters - Array of participants who voted
 * @returns Vote distribution and related statistics
 */
export function calculateVoteDistribution(voters: IParticipant[]): {
  distribution: IVoteDistribution[]
  totalVotes: number
  numericValues: number[]
} {
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

  return { distribution, totalVotes, numericValues }
}

/**
 * Calculate average of numeric values
 *
 * @param values - Array of numeric values
 * @returns Average value or null if empty
 */
export function calculateAverage(values: number[]): number | null {
  if (values.length === 0) return null
  return values.reduce((a, b) => a + b, 0) / values.length
}

/**
 * Determine if there is consensus (all votes match)
 *
 * @param distribution - Vote distribution
 * @param totalVotes - Total number of votes
 * @returns True if consensus exists
 */
export function hasConsensus(distribution: IVoteDistribution[], totalVotes: number): boolean {
  return distribution.length === 1 && totalVotes > 1
}

/**
 * Get mode (most common value) from distribution
 *
 * @param distribution - Vote distribution sorted by count descending
 * @returns Most common value or null if empty
 */
export function getMode(distribution: IVoteDistribution[]): PokerValue | null {
  return distribution.length > 0 ? distribution[0]?.value ?? null : null
}

/**
 * Create story statistics from voting result
 *
 * @param story - Story title
 * @param storyDescription - Story description
 * @param voters - Array of participants who voted
 * @returns Story statistics
 */
export function createStoryStats(
  story: string,
  storyDescription: string | null,
  voters: IParticipant[],
): IStoryStats {
  const { distribution, totalVotes, numericValues } = calculateVoteDistribution(voters)

  const average = calculateAverage(numericValues)
  const median = calculateMedian(numericValues)
  const mode = getMode(distribution)
  const consensus = hasConsensus(distribution, totalVotes)

  return {
    id: crypto.randomUUID(),
    story,
    storyDescription,
    timestamp: new Date(),
    voterCount: totalVotes,
    average,
    median,
    mode,
    hasConsensus: consensus,
    distribution,
    finalEstimate: mode,
  }
}

/**
 * Calculate quick stats from story history
 *
 * @param stories - Array of story statistics
 * @returns Quick stats summary
 */
export function calculateQuickStats(stories: IStoryStats[]): {
  totalStories: number
  totalPoints: number
  averagePoints: number
  consensusRate: number
  averageVotersPerStory: number
} {
  if (stories.length === 0) {
    return {
      totalStories: 0,
      totalPoints: 0,
      averagePoints: 0,
      consensusRate: 0,
      averageVotersPerStory: 0,
    }
  }

  const numericEstimates = stories
    .map(s => s.finalEstimate)
    .filter((v): v is PokerValue => v !== null)
    .map(v => Number.parseFloat(v))
    .filter(v => !Number.isNaN(v))

  const totalPoints = numericEstimates.reduce((a, b) => a + b, 0)
  const consensusCount = stories.filter(s => s.hasConsensus).length
  const totalVoters = stories.reduce((sum, s) => sum + s.voterCount, 0)

  return {
    totalStories: stories.length,
    totalPoints,
    averagePoints: numericEstimates.length > 0 ? totalPoints / numericEstimates.length : 0,
    consensusRate: (consensusCount / stories.length) * 100,
    averageVotersPerStory: totalVoters / stories.length,
  }
}

/**
 * Calculate consensus distribution
 *
 * @param stories - Array of story statistics
 * @returns Consensus and non-consensus counts
 */
export function calculateConsensusDistribution(stories: IStoryStats[]): {
  consensus: number
  noConsensus: number
} {
  const consensus = stories.filter(s => s.hasConsensus).length
  const noConsensus = stories.length - consensus

  return { consensus, noConsensus }
}

/**
 * Aggregate card frequencies from stories
 *
 * @param stories - Array of story statistics
 * @returns Card frequency array sorted by count descending
 */
export function aggregateCardFrequency(stories: IStoryStats[]): {
  value: PokerValue
  count: number
  percentage: number
}[] {
  const frequency = new Map<PokerValue, number>()
  let total = 0

  stories.forEach((story) => {
    story.distribution.forEach((dist) => {
      frequency.set(dist.value, (frequency.get(dist.value) || 0) + dist.count)
      total += dist.count
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
