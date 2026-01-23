<script setup lang="ts">
/**
 * StatsLineChart Component
 *
 * Line chart for story points over time using Chart.js.
 */

import { Line } from 'vue-chartjs'
import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import type { ITimeSeriesPoint } from '~/types/stats'

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const { t } = useI18n()

/**
 * Props Definition
 */
interface Props {
  /** Time series data points */
  data: ITimeSeriesPoint[]
  /** Chart title */
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '',
})

/**
 * Chart data configuration
 */
const chartData = computed(() => ({
  labels: props.data.map((point) => {
    const date = new Date(point.date)
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })
  }),
  datasets: [
    {
      label: t('stats.charts.storyPoints'),
      data: props.data.map(point => point.value),
      borderColor: 'rgb(99, 102, 241)',
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      fill: true,
      tension: 0.3,
      pointBackgroundColor: 'rgb(99, 102, 241)',
      pointBorderColor: '#fff',
      pointBorderWidth: 2,
      pointRadius: 4,
      pointHoverRadius: 6,
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
        label: (context: { raw: unknown, dataIndex: number }) => {
          const point = props.data[context.dataIndex]
          const value = typeof context.raw === 'number' ? context.raw : 0
          return `${point?.label ?? ''}: ${value.toFixed(1)} pts`
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
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        color: 'rgba(0, 0, 0, 0.05)',
      },
      ticks: {
        color: '#6b7280',
      },
    },
  },
}))
</script>

<template>
  <div class="h-64">
    <Line
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
