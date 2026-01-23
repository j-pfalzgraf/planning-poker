<script setup lang="ts">
/**
 * StatsBarChart Component
 *
 * Bar chart for card value frequency using Chart.js.
 */

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js'
import { Bar } from 'vue-chartjs'
import type { ICardFrequency } from '~/types/stats'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
)

const { t } = useI18n()

/**
 * Props Definition
 */
interface Props {
  /** Card frequency data */
  data: ICardFrequency[]
  /** Chart title */
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
})

/**
 * Color palette for bars
 */
const barColors = [
  'rgba(99, 102, 241, 0.8)',   // primary
  'rgba(139, 92, 246, 0.8)',   // violet
  'rgba(236, 72, 153, 0.8)',   // pink
  'rgba(34, 197, 94, 0.8)',    // green
  'rgba(251, 146, 60, 0.8)',   // orange
  'rgba(59, 130, 246, 0.8)',   // blue
  'rgba(168, 85, 247, 0.8)',   // purple
  'rgba(20, 184, 166, 0.8)',   // teal
  'rgba(245, 158, 11, 0.8)',   // amber
  'rgba(239, 68, 68, 0.8)',    // red
  'rgba(107, 114, 128, 0.8)',  // gray
  'rgba(156, 163, 175, 0.8)',  // gray-light
]

/**
 * Chart data configuration
 */
const chartData = computed(() => ({
  labels: props.data.map(item => item.value),
  datasets: [
    {
      label: t('stats.charts.votes'),
      data: props.data.map(item => item.count),
      backgroundColor: props.data.map((_, index) => barColors[index % barColors.length]),
      borderColor: props.data.map((_, index) =>
        barColors[index % barColors.length]?.replace('0.8', '1') ?? 'rgba(0,0,0,1)'
      ),
      borderWidth: 1,
      borderRadius: 4,
    },
  ],
}))

/**
 * Chart options
 */
const chartOptions = computed(() => ({
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
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
      displayColors: false,
      callbacks: {
        label: (context: { dataIndex: string | number; raw: unknown }) => {
          const item = props.data[context.dataIndex as number]
          return `${context.raw}× (${item?.percentage.toFixed(1) ?? 0}%)`
        },
      },
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        color: '#6b7280',
        font: {
          weight: 'bold' as const,
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
      ticks: {
        color: '#6b7280',
        stepSize: 1,
      },
    },
  },
}))
</script>

<template>
  <div class="h-64">
    <Bar
      v-if="data.length > 0"
      :data="chartData"
      :options="chartOptions"
    />
    <div
      v-else
      class="h-full flex items-center justify-center text-secondary-400"
    >
      <div class="text-center">
        <Icon name="heroicons:chart-bar" class="w-12 h-12 mx-auto mb-2 opacity-50" />
        <p class="text-sm">{{ t('stats.noData') }}</p>
      </div>
    </div>
  </div>
</template>
