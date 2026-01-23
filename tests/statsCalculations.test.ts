/**
 * Unit Tests for Statistics Calculation Functions
 *
 * Tests the pure calculation functions extracted from useLocalStats composable.
 * These functions handle median/mode calculation, vote distributions, and
 * aggregation across sessions.
 */

import { describe, expect, it } from 'bun:test'
import type { IParticipant, PokerValue } from '../app/types'
import type { IStoryStats } from '../app/types/stats'
import {
    aggregateCardFrequency,
    calculateAverage,
    calculateConsensusDistribution,
    calculateMedian,
    calculateQuickStats,
    calculateVoteDistribution,
    createStoryStats,
    getMode,
    hasConsensus,
} from '../app/utils/statsCalculations'

/**
 * Create a mock participant for testing
 */
function createMockParticipant(name: string, selectedValue: PokerValue | null = null, isObserver = false): IParticipant {
  return {
    id: crypto.randomUUID(),
    name,
    selectedValue,
    isObserver,
    joinedAt: new Date(),
  }
}

/**
 * Create a mock story stats for testing aggregation functions
 */
function createMockStoryStats(overrides: Partial<IStoryStats> = {}): IStoryStats {
  return {
    id: crypto.randomUUID(),
    story: 'Test Story',
    storyDescription: null,
    timestamp: new Date(),
    voterCount: 3,
    average: 5,
    median: 5,
    mode: '5',
    hasConsensus: false,
    distribution: [
      { value: '5', count: 2, percentage: 66.67 },
      { value: '3', count: 1, percentage: 33.33 },
    ],
    finalEstimate: '5',
    ...overrides,
  }
}

describe('calculateMedian', () => {
  it('calculates median for odd number of values', () => {
    const result = calculateMedian([1, 3, 5])

    expect(result).toBe(3)
  })

  it('calculates median for even number of values', () => {
    const result = calculateMedian([2, 3, 5, 8])

    // Median of [2, 3, 5, 8] = (3 + 5) / 2 = 4
    expect(result).toBe(4)
  })

  it('returns null for empty array', () => {
    const result = calculateMedian([])

    expect(result).toBeNull()
  })

  it('handles single value', () => {
    const result = calculateMedian([5])

    expect(result).toBe(5)
  })

  it('handles two values', () => {
    const result = calculateMedian([3, 7])

    // (3 + 7) / 2 = 5
    expect(result).toBe(5)
  })

  it('handles unsorted input correctly', () => {
    const result = calculateMedian([8, 1, 5, 3, 2])

    // Sorted: [1, 2, 3, 5, 8] -> median is 3
    expect(result).toBe(3)
  })

  it('handles duplicate values', () => {
    const result = calculateMedian([5, 5, 5, 5, 5])

    expect(result).toBe(5)
  })

  it('handles decimal values in even-length array', () => {
    const result = calculateMedian([1, 2])

    expect(result).toBe(1.5)
  })
})

describe('calculateAverage', () => {
  it('calculates average of numeric values', () => {
    const result = calculateAverage([2, 4, 6])

    expect(result).toBe(4)
  })

  it('returns null for empty array', () => {
    const result = calculateAverage([])

    expect(result).toBeNull()
  })

  it('handles single value', () => {
    const result = calculateAverage([10])

    expect(result).toBe(10)
  })

  it('handles decimal result', () => {
    const result = calculateAverage([1, 2, 3])

    expect(result).toBe(2)
  })

  it('handles large numbers', () => {
    const result = calculateAverage([100, 200, 300])

    expect(result).toBe(200)
  })
})

describe('calculateVoteDistribution', () => {
  it('correctly calculates vote distribution', () => {
    const voters = [
      createMockParticipant('Alice', '5'),
      createMockParticipant('Bob', '5'),
      createMockParticipant('Charlie', '3'),
      createMockParticipant('Dave', '8'),
    ]

    const result = calculateVoteDistribution(voters)

    expect(result.totalVotes).toBe(4)

    // Check distribution - sorted by count descending
    const fiveVotes = result.distribution.find(d => d.value === '5')
    expect(fiveVotes).toBeDefined()
    expect(fiveVotes!.count).toBe(2)
    expect(fiveVotes!.percentage).toBe(50)

    const threeVotes = result.distribution.find(d => d.value === '3')
    expect(threeVotes).toBeDefined()
    expect(threeVotes!.count).toBe(1)
    expect(threeVotes!.percentage).toBe(25)
  })

  it('ignores voters with null selection', () => {
    const voters = [
      createMockParticipant('Alice', '5'),
      createMockParticipant('Bob', null),
      createMockParticipant('Charlie', '3'),
    ]

    const result = calculateVoteDistribution(voters)

    expect(result.totalVotes).toBe(2)
    expect(result.numericValues).toEqual([5, 3])
  })

  it('extracts numeric values correctly', () => {
    const voters = [
      createMockParticipant('Alice', '3'),
      createMockParticipant('Bob', '?'),
      createMockParticipant('Charlie', '☕'),
      createMockParticipant('Dave', '5'),
    ]

    const result = calculateVoteDistribution(voters)

    // Only [3, 5] are numeric
    expect(result.numericValues).toEqual([3, 5])
    expect(result.totalVotes).toBe(4)
  })

  it('returns empty distribution for no voters', () => {
    const voters: IParticipant[] = []

    const result = calculateVoteDistribution(voters)

    expect(result.distribution).toHaveLength(0)
    expect(result.totalVotes).toBe(0)
    expect(result.numericValues).toHaveLength(0)
  })

  it('sorts distribution by count descending', () => {
    const voters = [
      createMockParticipant('Alice', '1'),
      createMockParticipant('Bob', '5'),
      createMockParticipant('Charlie', '5'),
      createMockParticipant('Dave', '5'),
    ]

    const result = calculateVoteDistribution(voters)

    expect(result.distribution[0]!.value).toBe('5')
    expect(result.distribution[0]!.count).toBe(3)
    expect(result.distribution[1]!.value).toBe('1')
    expect(result.distribution[1]!.count).toBe(1)
  })
})

describe('getMode', () => {
  it('returns most common value', () => {
    const distribution = [
      { value: '5' as PokerValue, count: 3, percentage: 60 },
      { value: '3' as PokerValue, count: 2, percentage: 40 },
    ]

    const result = getMode(distribution)

    expect(result).toBe('5')
  })

  it('returns null for empty distribution', () => {
    const result = getMode([])

    expect(result).toBeNull()
  })

  it('returns first value when distribution has one entry', () => {
    const distribution = [
      { value: '8' as PokerValue, count: 5, percentage: 100 },
    ]

    const result = getMode(distribution)

    expect(result).toBe('8')
  })
})

describe('hasConsensus', () => {
  it('returns true when all votes match (single distribution entry, multiple voters)', () => {
    const distribution = [
      { value: '8' as PokerValue, count: 3, percentage: 100 },
    ]

    const result = hasConsensus(distribution, 3)

    expect(result).toBe(true)
  })

  it('returns false for single voter', () => {
    const distribution = [
      { value: '5' as PokerValue, count: 1, percentage: 100 },
    ]

    const result = hasConsensus(distribution, 1)

    expect(result).toBe(false)
  })

  it('returns false when votes differ', () => {
    const distribution = [
      { value: '5' as PokerValue, count: 2, percentage: 50 },
      { value: '3' as PokerValue, count: 2, percentage: 50 },
    ]

    const result = hasConsensus(distribution, 4)

    expect(result).toBe(false)
  })

  it('returns false for empty distribution', () => {
    const result = hasConsensus([], 0)

    expect(result).toBe(false)
  })
})

describe('createStoryStats', () => {
  it('creates story stats from voters', () => {
    const voters = [
      createMockParticipant('Alice', '3'),
      createMockParticipant('Bob', '5'),
      createMockParticipant('Charlie', '5'),
    ]

    const result = createStoryStats('Story #1', 'Test description', voters)

    expect(result.story).toBe('Story #1')
    expect(result.storyDescription).toBe('Test description')
    expect(result.voterCount).toBe(3)
    expect(result.mode).toBe('5')
    expect(result.hasConsensus).toBe(false)
    expect(result.finalEstimate).toBe('5')
    expect(result.id).toBeDefined()
    expect(result.timestamp).toBeInstanceOf(Date)
  })

  it('calculates average and median correctly', () => {
    const voters = [
      createMockParticipant('Alice', '3'),
      createMockParticipant('Bob', '5'),
      createMockParticipant('Charlie', '8'),
    ]

    const result = createStoryStats('Story', null, voters)

    // (3 + 5 + 8) / 3 = 5.33...
    expect(result.average).toBeCloseTo(5.33, 1)
    expect(result.median).toBe(5)
  })

  it('detects consensus when all votes match', () => {
    const voters = [
      createMockParticipant('Alice', '8'),
      createMockParticipant('Bob', '8'),
      createMockParticipant('Charlie', '8'),
    ]

    const result = createStoryStats('Story', null, voters)

    expect(result.hasConsensus).toBe(true)
    expect(result.mode).toBe('8')
  })

  it('handles non-numeric values correctly', () => {
    const voters = [
      createMockParticipant('Alice', '?'),
      createMockParticipant('Bob', '☕'),
    ]

    const result = createStoryStats('Story', null, voters)

    expect(result.average).toBeNull()
    expect(result.median).toBeNull()
    expect(result.voterCount).toBe(2)
  })
})

describe('calculateQuickStats', () => {
  it('returns zeros for empty stories array', () => {
    const result = calculateQuickStats([])

    expect(result.totalStories).toBe(0)
    expect(result.totalPoints).toBe(0)
    expect(result.averagePoints).toBe(0)
    expect(result.consensusRate).toBe(0)
    expect(result.averageVotersPerStory).toBe(0)
  })

  it('calculates total stories correctly', () => {
    const stories = [
      createMockStoryStats({ story: 'Story 1' }),
      createMockStoryStats({ story: 'Story 2' }),
      createMockStoryStats({ story: 'Story 3' }),
    ]

    const result = calculateQuickStats(stories)

    expect(result.totalStories).toBe(3)
  })

  it('calculates total points from final estimates', () => {
    const stories = [
      createMockStoryStats({ finalEstimate: '3' }),
      createMockStoryStats({ finalEstimate: '5' }),
      createMockStoryStats({ finalEstimate: '8' }),
    ]

    const result = calculateQuickStats(stories)

    expect(result.totalPoints).toBe(16) // 3 + 5 + 8
  })

  it('calculates average points correctly', () => {
    const stories = [
      createMockStoryStats({ finalEstimate: '3' }),
      createMockStoryStats({ finalEstimate: '5' }),
      createMockStoryStats({ finalEstimate: '13' }),
    ]

    const result = calculateQuickStats(stories)

    expect(result.averagePoints).toBe(7) // (3 + 5 + 13) / 3 = 7
  })

  it('calculates consensus rate correctly', () => {
    const stories = [
      createMockStoryStats({ hasConsensus: true }),
      createMockStoryStats({ hasConsensus: true }),
      createMockStoryStats({ hasConsensus: false }),
      createMockStoryStats({ hasConsensus: false }),
    ]

    const result = calculateQuickStats(stories)

    expect(result.consensusRate).toBe(50) // 2 out of 4 = 50%
  })

  it('calculates average voters per story', () => {
    const stories = [
      createMockStoryStats({ voterCount: 3 }),
      createMockStoryStats({ voterCount: 5 }),
      createMockStoryStats({ voterCount: 4 }),
    ]

    const result = calculateQuickStats(stories)

    expect(result.averageVotersPerStory).toBe(4) // (3 + 5 + 4) / 3
  })

  it('ignores non-numeric final estimates in points calculation', () => {
    const stories = [
      createMockStoryStats({ finalEstimate: '5' }),
      createMockStoryStats({ finalEstimate: '?' }),
      createMockStoryStats({ finalEstimate: '☕' }),
      createMockStoryStats({ finalEstimate: '3' }),
    ]

    const result = calculateQuickStats(stories)

    expect(result.totalPoints).toBe(8) // 5 + 3
    expect(result.averagePoints).toBe(4) // 8 / 2 (only 2 numeric)
  })

  it('handles null final estimates', () => {
    const stories = [
      createMockStoryStats({ finalEstimate: '5' }),
      createMockStoryStats({ finalEstimate: null }),
    ]

    const result = calculateQuickStats(stories)

    expect(result.totalPoints).toBe(5)
    expect(result.averagePoints).toBe(5)
  })
})

describe('calculateConsensusDistribution', () => {
  it('returns zeros for empty stories array', () => {
    const result = calculateConsensusDistribution([])

    expect(result.consensus).toBe(0)
    expect(result.noConsensus).toBe(0)
  })

  it('correctly counts consensus stories', () => {
    const stories = [
      createMockStoryStats({ hasConsensus: true }),
      createMockStoryStats({ hasConsensus: true }),
      createMockStoryStats({ hasConsensus: true }),
    ]

    const result = calculateConsensusDistribution(stories)

    expect(result.consensus).toBe(3)
    expect(result.noConsensus).toBe(0)
  })

  it('correctly counts non-consensus stories', () => {
    const stories = [
      createMockStoryStats({ hasConsensus: false }),
      createMockStoryStats({ hasConsensus: false }),
    ]

    const result = calculateConsensusDistribution(stories)

    expect(result.consensus).toBe(0)
    expect(result.noConsensus).toBe(2)
  })

  it('correctly counts mixed consensus and non-consensus', () => {
    const stories = [
      createMockStoryStats({ hasConsensus: true }),
      createMockStoryStats({ hasConsensus: false }),
      createMockStoryStats({ hasConsensus: true }),
      createMockStoryStats({ hasConsensus: false }),
      createMockStoryStats({ hasConsensus: false }),
    ]

    const result = calculateConsensusDistribution(stories)

    expect(result.consensus).toBe(2)
    expect(result.noConsensus).toBe(3)
  })
})

describe('aggregateCardFrequency', () => {
  it('returns empty array for empty stories', () => {
    const result = aggregateCardFrequency([])

    expect(result).toHaveLength(0)
  })

  it('aggregates card frequencies across stories', () => {
    const stories = [
      createMockStoryStats({
        distribution: [
          { value: '5', count: 2, percentage: 66.67 },
          { value: '3', count: 1, percentage: 33.33 },
        ],
      }),
      createMockStoryStats({
        distribution: [
          { value: '5', count: 1, percentage: 50 },
          { value: '8', count: 1, percentage: 50 },
        ],
      }),
    ]

    const result = aggregateCardFrequency(stories)

    const fiveFreq = result.find(f => f.value === '5')
    expect(fiveFreq).toBeDefined()
    expect(fiveFreq!.count).toBe(3) // 2 + 1

    const threeFreq = result.find(f => f.value === '3')
    expect(threeFreq).toBeDefined()
    expect(threeFreq!.count).toBe(1)

    const eightFreq = result.find(f => f.value === '8')
    expect(eightFreq).toBeDefined()
    expect(eightFreq!.count).toBe(1)
  })

  it('calculates percentages based on total votes', () => {
    const stories = [
      createMockStoryStats({
        distribution: [
          { value: '5', count: 3, percentage: 100 },
        ],
      }),
      createMockStoryStats({
        distribution: [
          { value: '3', count: 1, percentage: 100 },
        ],
      }),
    ]

    const result = aggregateCardFrequency(stories)

    const fiveFreq = result.find(f => f.value === '5')
    expect(fiveFreq!.percentage).toBe(75) // 3 out of 4 total votes

    const threeFreq = result.find(f => f.value === '3')
    expect(threeFreq!.percentage).toBe(25) // 1 out of 4 total votes
  })

  it('sorts by count descending', () => {
    const stories = [
      createMockStoryStats({
        distribution: [
          { value: '1', count: 1, percentage: 25 },
          { value: '3', count: 1, percentage: 25 },
          { value: '5', count: 2, percentage: 50 },
        ],
      }),
    ]

    const result = aggregateCardFrequency(stories)

    expect(result[0]!.value).toBe('5')
    expect(result[0]!.count).toBe(2)
  })
})

describe('integration tests', () => {
  it('full voting flow produces correct stats', () => {
    // Simulate a complete voting round
    const voters = [
      createMockParticipant('Alice', '3'),
      createMockParticipant('Bob', '5'),
      createMockParticipant('Charlie', '5'),
      createMockParticipant('Dave', '8'),
    ]

    const storyStats = createStoryStats('User Login Story', 'As a user, I want to log in', voters)

    // Verify all calculations
    expect(storyStats.voterCount).toBe(4)
    expect(storyStats.mode).toBe('5')
    expect(storyStats.hasConsensus).toBe(false)
    expect(storyStats.average).toBeCloseTo(5.25, 2) // (3 + 5 + 5 + 8) / 4
    expect(storyStats.median).toBe(5) // Middle of [3, 5, 5, 8]

    // Verify distribution
    expect(storyStats.distribution).toHaveLength(3)
    const fiveDist = storyStats.distribution.find(d => d.value === '5')
    expect(fiveDist!.count).toBe(2)
    expect(fiveDist!.percentage).toBe(50)
  })

  it('multiple stories aggregate correctly', () => {
    const story1 = createStoryStats('Story 1', null, [
      createMockParticipant('Alice', '3'),
      createMockParticipant('Bob', '3'),
    ])

    const story2 = createStoryStats('Story 2', null, [
      createMockParticipant('Alice', '5'),
      createMockParticipant('Bob', '8'),
    ])

    const quickStats = calculateQuickStats([story1, story2])

    expect(quickStats.totalStories).toBe(2)
    expect(quickStats.consensusRate).toBe(50) // Only story1 has consensus
  })
})
