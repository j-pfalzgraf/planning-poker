<script setup lang="ts">
/**
 * StatsDoughnutChart Component
 *
 * Doughnut chart for consensus distribution using Chart.js.
 */

import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Title,
  Tooltip,
} from 'chart.js'
import { Doughnut } from 'vue-chartjs'

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Title,
  Tooltip,
  Legend
)

const { t } = useI18n()

/**
 * Props Definition
 */
interface Props {
  /** Number of stories with consensus */
  consensus: number
  /** Number of stories without consensus */
  noConsensus: number
  /** Chart title */
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
})

/**
 * Total stories
 */
const total = computed(() => props.consensus + props.noConsensus)

/**
 * Consensus percentage
 */
const consensusPercent = computed(() =>
  total.value > 0 ? ((props.consensus / total.value) * 100).toFixed(1) : '0'
)

/**
 * Chart data configuration
 */
const chartData = computed(() => ({
  labels: [t('stats.charts.consensus'), t('stats.charts.noConsensus')],
  datasets: [
    {
      data: [props.consensus, props.noConsensus],
      backgroundColor: [
        'rgba(34, 197, 94, 0.8)',  // green for consensus
        'rgba(239, 68, 68, 0.8)',  // red for no consensus
      ],
      borderColor: [
        'rgba(34, 197, 94, 1)',
        'rgba(239, 68, 68, 1)',
      ],
      borderWidth: 2,
      hoverOffset: 4,
    },
  ],
}))

/**
 * Chart options
 */
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  cutout: '60%',
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        padding: 16,
        usePointStyle: true,
        pointStyle: 'circle',
        color: '#374151',
      },
    },
    title: {
      display: !!props.title,
      text: props.title,
      font: {
        size: 14,
        weight: 'bold' as const,
      },
      color: '#374151',
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#fff',
      bodyColor: '#fff',
      padding: 12,
      displayColors: true,
      callbacks: {
        label: (context: { raw: unknown }) => {
          const value = context.raw as number
          const percentage = total.value > 0 ? ((value / total.value) * 100).toFixed(1) : 0
          return ` ${value} (${percentage}%)`
        },
      },
    },
  },
}))
</script>

<template>
  <div class="h-64 relative">
    <Doughnut
      v-if="total > 0"
      :data="chartData"
      :options="chartOptions"
    />
    <!-- Center text -->
    <div
      v-if="total > 0"
      class="absolute inset-0 flex items-center justify-center pointer-events-none"
      style="top: -20px;"
    >
      <div class="text-center">
        <div class="text-2xl font-bold text-secondary-800">{{ consensusPercent }}%</div>
        <div class="text-xs text-secondary-500">{{ t('stats.charts.consensusRate') }}</div>
      </div>
    </div>
    <div
      v-else
      class="h-full flex items-center justify-center text-secondary-400"
    >
      <div class="text-center">
        <Icon name="heroicons:chart-pie" class="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p class="text-sm">{{ t('stats.noData') }}</p>
      </div>
    </div>
  </div>
</template>
