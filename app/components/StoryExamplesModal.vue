<script setup lang="ts">
/**
 * StoryExamplesModal Component
 *
 * Modal displaying example stories as reference for story point estimation.
 * Loads real Markdown content from the examples folder for detailed, realistic stories.
 */

const { t } = useI18n()

/**
 * Props Definition
 */
interface Props {
  /** Modal visible? */
  visible: boolean
}

const props = defineProps<Props>()

/**
 * Events Definition
 */
const emit = defineEmits<{
  close: []
}>()

/**
 * Currently selected story point category
 */
const selectedPoints = ref<string | null>(null)

/**
 * Active tab in modal
 */
const selectedTab = ref<'examples' | 'matrix'>('examples')

/**
 * Mapping of point values to markdown file slugs
 */
const pointToSlug: Record<string, string> = {
  '0': '0-points',
  '1': '1-point',
  '2': '2-points',
  '3': '3-points',
  '5': '5-points',
  '8': '8-points',
  '13': '13-points',
  '21': '21-points',
  '40': '40-points',
  '100': '100-points',
  '?': 'unknown-points',
  '☕': 'coffee-break',
}

/**
 * Fetched markdown content for selected points
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const storyContent = ref<any>(null)
const isLoadingContent = ref(false)
const contentError = ref(false)

/**
 * Get current locale for content loading
 */
const { locale } = useI18n()

/**
 * Fetch content when selected points change or locale changes
 */
watch([selectedPoints, locale], async ([newPoints]) => {
  if (!newPoints || !pointToSlug[newPoints]) {
    storyContent.value = null
    return
  }

  isLoadingContent.value = true
  contentError.value = false

  try {
    const slug = pointToSlug[newPoints]
    let result = null

    // Map locale to collection name
    const localeCollectionMap: Record<string, string> = {
      'de': 'examplesDe',
      'es': 'examplesEs',
      'fr': 'examplesFr',
      'it': 'examplesIt',
      'ja': 'examplesJa',
      'nl': 'examplesNl',
      'pl': 'examplesPl',
      'pt-BR': 'examplesPtBr',
      'ru': 'examplesRu',
      'sv': 'examplesSv',
      'zh-CN': 'examplesZhCn',
    }

    // Map locale to path prefix (paths are lowercased by Nuxt Content)
    const localePathMap: Record<string, string> = {
      'de': '/examples/de',
      'es': '/examples/es',
      'fr': '/examples/fr',
      'it': '/examples/it',
      'ja': '/examples/ja',
      'nl': '/examples/nl',
      'pl': '/examples/pl',
      'pt-BR': '/examples/pt-br',
      'ru': '/examples/ru',
      'sv': '/examples/sv',
      'zh-CN': '/examples/zh-cn',
    }

    // Try locale-specific content first
    const collectionName = localeCollectionMap[locale.value]
    const pathPrefix = localePathMap[locale.value]

    if (collectionName && pathPrefix) {
      try {
        result = await queryCollection(collectionName as 'examplesDe' | 'examplesEs' | 'examplesFr' | 'examplesIt' | 'examplesJa' | 'examplesNl' | 'examplesPl' | 'examplesPtBr' | 'examplesRu' | 'examplesSv' | 'examplesZhCn')
          .where('path', '=', `${pathPrefix}/${slug}`)
          .first()
      }
      catch {
        // Collection might not exist yet, fall back to default
      }
    }

    // Fallback to English (default)
    if (!result) {
      result = await queryCollection('examples')
        .where('path', '=', `/examples/${slug}`)
        .first()
    }

    storyContent.value = result ?? null
    contentError.value = !result
  }
  catch (e) {
    console.error('Error loading story content:', e)
    contentError.value = true
    storyContent.value = null
  }
  finally {
    isLoadingContent.value = false
  }
}, { immediate: true })

/**
 * Story point categories for the selector
 */
interface PointCategory {
  value: string
  label: string
  color: string
  bgColor: string
}

const pointCategories: PointCategory[] = [
  { value: '0', label: '0', color: 'text-emerald-600', bgColor: 'bg-emerald-100' },
  { value: '1', label: '1', color: 'text-green-600', bgColor: 'bg-green-100' },
  { value: '2', label: '2', color: 'text-lime-600', bgColor: 'bg-lime-100' },
  { value: '3', label: '3', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  { value: '5', label: '5', color: 'text-amber-600', bgColor: 'bg-amber-100' },
  { value: '8', label: '8', color: 'text-orange-600', bgColor: 'bg-orange-100' },
  { value: '13', label: '13', color: 'text-orange-700', bgColor: 'bg-orange-200' },
  { value: '21', label: '21', color: 'text-red-600', bgColor: 'bg-red-100' },
  { value: '40', label: '40', color: 'text-red-700', bgColor: 'bg-red-200' },
  { value: '100', label: '100', color: 'text-red-800', bgColor: 'bg-red-200' },
  { value: '?', label: '?', color: 'text-secondary-600', bgColor: 'bg-secondary-100' },
  { value: '☕', label: '☕', color: 'text-amber-700', bgColor: 'bg-amber-50' },
]

/**
 * Currently selected category details
 */
const selectedCategory = computed(() => {
  return pointCategories.find(c => c.value === selectedPoints.value)
})

/**
 * Matrix data for risk vs complexity
 * 4 rows (veryLow, low, medium, high) × 3 columns = 12 cells for 10 story points
 * Each cell contains individual story point values as badges
 */
interface MatrixCell {
  values: string[]
}

interface MatrixRow {
  label: string
  cells: MatrixCell[]
}

const matrixRows = computed<MatrixRow[]>(() => [
  {
    label: t('storyExamples.matrix.levels.veryLow'),
    cells: [
      { values: ['0'] },
      { values: ['1'] },
      { values: ['2'] },
    ],
  },
  {
    label: t('storyExamples.matrix.levels.low'),
    cells: [
      { values: ['1'] },
      { values: ['2'] },
      { values: ['3'] },
    ],
  },
  {
    label: t('storyExamples.matrix.levels.medium'),
    cells: [
      { values: ['3'] },
      { values: ['5'] },
      { values: ['8'] },
    ],
  },
  {
    label: t('storyExamples.matrix.levels.high'),
    cells: [
      { values: ['13'] },
      { values: ['21'] },
      { values: ['40', '100'] },
    ],
  },
])

/**
 * Matrix color mapping based on combined risk × complexity severity
 * Gradient from green (low severity) through yellow/orange to red (high severity)
 */
const matrixCellClasses = (rowIndex: number, cellIndex: number): string => {
  // Calculate severity score (0-6) based on row + column
  const severity = rowIndex + cellIndex

  const severityColors: string[] = [
    'bg-emerald-50 border-emerald-200',   // 0: Very Low × Low
    'bg-green-50 border-green-200',       // 1: Very Low × Med, Low × Low
    'bg-lime-50 border-lime-200',         // 2: Very Low × High, Low × Med, Med × Low
    'bg-yellow-50 border-yellow-200',     // 3: Low × High, Med × Med, High × Low
    'bg-amber-50 border-amber-200',       // 4: Med × High, High × Med
    'bg-orange-50 border-orange-200',     // 5: High × High
    'bg-red-50 border-red-200',           // 6: (overflow)
  ]

  return severityColors[severity] ?? 'bg-secondary-50 border-secondary-200'
}

/**
 * Badge color based on story point value
 * Consistent color scheme matching the severity gradient
 */
const getBadgeClasses = (value: string): string => {
  const badgeColors: Record<string, string> = {
    '0': 'bg-emerald-500 text-white',
    '1': 'bg-green-500 text-white',
    '2': 'bg-lime-500 text-white',
    '3': 'bg-yellow-500 text-yellow-950',
    '5': 'bg-amber-500 text-amber-950',
    '8': 'bg-orange-500 text-white',
    '13': 'bg-orange-600 text-white',
    '21': 'bg-red-500 text-white',
    '40': 'bg-red-600 text-white',
    '100': 'bg-red-700 text-white',
  }
  return badgeColors[value] ?? 'bg-secondary-500 text-white'
}

/**
 * Close on Escape
 */
function handleKeydown(e: KeyboardEvent): void {
  if (e.key === 'Escape') {
    emit('close')
  }
}

/**
 * Reset selection when modal opens
 */
watch(() => props.visible, (isVisible) => {
  if (isVisible) {
    selectedPoints.value = null
    selectedTab.value = 'examples'
  }
})

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="visible"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/50 backdrop-blur-sm"
          @click="emit('close')"
        />

        <!-- Modal -->
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden flex flex-col">
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-secondary-100 flex-shrink-0">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-primary-100 rounded-lg text-primary-600">
                <Icon name="heroicons:book-open" class="w-5 h-5" />
              </div>
              <div>
                <h3 class="text-lg font-bold text-secondary-900">
                  {{ t('storyExamples.title') }}
                </h3>
                <p class="text-sm text-secondary-500">
                  {{ t('storyExamples.subtitle') }}
                </p>
              </div>
            </div>
            <button
              type="button"
              class="p-2 text-secondary-400 hover:text-secondary-600 transition-colors rounded-lg hover:bg-secondary-100"
              @click="emit('close')"
            >
              <Icon name="heroicons:x-mark" class="w-5 h-5" />
            </button>
          </div>

          <!-- Content -->
          <div class="flex-1 overflow-hidden flex flex-col md:flex-row">
            <!-- Tabs -->
            <div class="w-full flex md:hidden border-b border-secondary-100">
              <button
                type="button"
                class="flex-1 px-4 py-3 text-sm font-medium transition-colors"
                :class="selectedTab === 'examples' ? 'text-primary-700 border-b-2 border-primary-500' : 'text-secondary-600'"
                @click="selectedTab = 'examples'"
              >
                {{ t('storyExamples.tabs.examples') }}
              </button>
              <button
                type="button"
                class="flex-1 px-4 py-3 text-sm font-medium transition-colors"
                :class="selectedTab === 'matrix' ? 'text-primary-700 border-b-2 border-primary-500' : 'text-secondary-600'"
                @click="selectedTab = 'matrix'"
              >
                {{ t('storyExamples.tabs.matrix') }}
              </button>
            </div>

            <!-- Story Point Selector -->
            <div v-show="selectedTab === 'examples'" class="md:w-64 border-b md:border-b-0 md:border-r border-secondary-100 p-4 flex-shrink-0 overflow-y-auto">
              <div class="hidden md:flex gap-2 mb-4">
                <button
                  type="button"
                  class="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
                  :class="selectedTab === 'examples' ? 'bg-primary-100 text-primary-700' : 'bg-secondary-100 text-secondary-600'"
                  @click="selectedTab = 'examples'"
                >
                  {{ t('storyExamples.tabs.examples') }}
                </button>
                <button
                  type="button"
                  class="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
                  :class="selectedTab === 'matrix' ? 'bg-primary-100 text-primary-700' : 'bg-secondary-100 text-secondary-600'"
                  @click="selectedTab = 'matrix'"
                >
                  {{ t('storyExamples.tabs.matrix') }}
                </button>
              </div>
              <div class="text-xs font-medium text-secondary-500 uppercase tracking-wide mb-3">
                {{ t('storyExamples.selectPoints') }}
              </div>
              <div class="grid grid-cols-4 md:grid-cols-2 gap-2">
                <button
                  v-for="category in pointCategories"
                  :key="category.value"
                  type="button"
                  class="p-3 rounded-xl border-2 transition-all text-center"
                  :class="[
                    selectedPoints === category.value
                      ? `${category.bgColor} border-current ${category.color} shadow-md`
                      : 'border-secondary-200 hover:border-secondary-300 hover:bg-secondary-50',
                  ]"
                  @click="selectedPoints = category.value"
                >
                  <div class="text-xl font-bold" :class="selectedPoints === category.value ? category.color : 'text-secondary-700'">
                    {{ category.label }}
                  </div>
                </button>
              </div>
            </div>

            <!-- Examples Display -->
            <div v-show="selectedTab === 'examples'" class="flex-1 overflow-hidden flex flex-col">
              <Transition name="fade" mode="out-in">
                <!-- No selection -->
                <div v-if="!selectedCategory" class="flex-1 flex items-center justify-center p-6">
                  <div class="text-center">
                    <Icon name="heroicons:hand-raised" class="w-16 h-16 text-secondary-300 mx-auto mb-4" />
                    <p class="text-secondary-500">
                      {{ t('storyExamples.selectPrompt') }}
                    </p>
                  </div>
                </div>

                <!-- Selected category with Markdown content -->
                <div v-else :key="selectedCategory.value" class="flex-1 flex flex-col overflow-hidden">
                  <!-- Category Header (fixed) -->
                  <div class="flex items-center gap-4 p-6 pb-4 flex-shrink-0 border-b border-secondary-100">
                    <div
                      class="w-14 h-14 rounded-xl flex items-center justify-center text-2xl font-bold flex-shrink-0"
                      :class="[selectedCategory.bgColor, selectedCategory.color]"
                    >
                      {{ selectedCategory.label }}
                    </div>
                    <div class="min-w-0">
                      <div class="text-lg font-bold text-secondary-800">
                        {{ selectedCategory.label }} {{ selectedCategory.value !== '?' && selectedCategory.value !== '☕' ? t('storyExamples.points') : '' }}
                      </div>
                      <p class="text-sm text-secondary-500 truncate">
                        {{ t('storyExamples.detailedExamples') }}
                      </p>
                    </div>
                  </div>

                  <!-- Scrollable Markdown Content -->
                  <div class="flex-1 overflow-y-auto p-6 story-content">
                    <!-- Loading State -->
                    <div v-if="isLoadingContent" class="flex items-center justify-center py-12">
                      <Icon name="heroicons:arrow-path" class="w-8 h-8 text-secondary-400 animate-spin" />
                    </div>

                    <!-- Error State -->
                    <div v-else-if="contentError" class="text-center py-12 text-secondary-500">
                      <Icon name="heroicons:exclamation-circle" class="w-12 h-12 mx-auto mb-3 text-secondary-300" />
                      <p>{{ t('storyExamples.noContent') }}</p>
                    </div>

                    <!-- Markdown Content via Nuxt Content -->
                    <div
                      v-else-if="storyContent"
                      class="prose prose-secondary max-w-none prose-headings:font-bold prose-h1:text-xl prose-h1:border-b prose-h1:border-secondary-200 prose-h1:pb-2 prose-h1:mb-4 prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-3 prose-h3:text-base prose-h3:mt-4 prose-h4:text-sm prose-h4:font-semibold prose-blockquote:bg-secondary-50 prose-blockquote:border-l-primary-500 prose-blockquote:py-2 prose-blockquote:px-4 prose-blockquote:not-italic prose-blockquote:text-secondary-700 prose-ul:my-2 prose-li:my-0.5 prose-code:bg-secondary-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none prose-hr:my-6 prose-hr:border-secondary-200 prose-strong:text-secondary-800 prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline"
                    >
                      <ContentRenderer :value="storyContent" />
                    </div>

                    <!-- Empty State -->
                    <div v-else class="text-center py-12 text-secondary-500">
                      <Icon name="heroicons:document-text" class="w-12 h-12 mx-auto mb-3 text-secondary-300" />
                      <p>{{ t('storyExamples.noContent') }}</p>
                    </div>
                  </div>
                </div>
              </Transition>
            </div>

            <!-- Matrix Display -->
            <div v-show="selectedTab === 'matrix'" class="flex-1 p-6 overflow-y-auto">
              <!-- Desktop Tab Navigation -->
              <div class="hidden md:flex gap-2 mb-4">
                <button
                  type="button"
                  class="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
                  :class="selectedTab === 'examples' ? 'bg-primary-100 text-primary-700' : 'bg-secondary-100 text-secondary-600'"
                  @click="selectedTab = 'examples'"
                >
                  {{ t('storyExamples.tabs.examples') }}
                </button>
                <button
                  type="button"
                  class="px-3 py-1.5 text-xs font-medium rounded-lg transition-colors"
                  :class="selectedTab === 'matrix' ? 'bg-primary-100 text-primary-700' : 'bg-secondary-100 text-secondary-600'"
                  @click="selectedTab = 'matrix'"
                >
                  {{ t('storyExamples.tabs.matrix') }}
                </button>
              </div>

              <div class="mb-4">
                <h4 class="text-lg font-bold text-secondary-800">
                  {{ t('storyExamples.matrix.title') }}
                </h4>
                <p class="text-sm text-secondary-500">
                  {{ t('storyExamples.matrix.subtitle') }}
                </p>
              </div>

              <div class="overflow-x-auto">
                <div class="min-w-[420px]">
                  <div class="flex items-center text-xs font-medium text-secondary-500 mb-1">
                    <div class="w-16" />
                    <div class="flex-1 text-center">
                      {{ t('storyExamples.matrix.axis.complexity') }}
                    </div>
                  </div>

                  <div class="grid grid-cols-4 gap-2 text-xs font-medium text-secondary-500 mb-2">
                    <div class="text-right pr-2">
                      {{ t('storyExamples.matrix.axis.risk') }}
                    </div>
                    <div class="text-center">{{ t('storyExamples.matrix.levels.low') }}</div>
                    <div class="text-center">{{ t('storyExamples.matrix.levels.medium') }}</div>
                    <div class="text-center">{{ t('storyExamples.matrix.levels.high') }}</div>
                  </div>

                  <div
                    v-for="(row, rowIndex) in matrixRows"
                    :key="rowIndex"
                    class="grid grid-cols-4 gap-2 items-stretch mb-2"
                  >
                    <div class="flex items-center justify-end text-xs font-medium text-secondary-500 pr-2">
                      {{ row.label }}
                    </div>
                    <div
                      v-for="(cell, cellIndex) in row.cells"
                      :key="cellIndex"
                      class="border border-secondary-200 rounded-lg p-3 flex items-center justify-center gap-2"
                      :class="matrixCellClasses(rowIndex, cellIndex)"
                    >
                      <span
                        v-for="val in cell.values"
                        :key="val"
                        class="inline-flex items-center justify-center min-w-[2rem] px-2 py-1 text-sm font-bold rounded-lg"
                        :class="getBadgeClasses(val)"
                      >
                        {{ val }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-6 p-4 bg-accent-50 rounded-xl border border-accent-100">
                <div class="flex items-start gap-3">
                  <Icon name="heroicons:light-bulb" class="w-5 h-5 text-accent-600 flex-shrink-0 mt-0.5" />
                  <p class="text-sm text-accent-700">
                    {{ t('storyExamples.matrix.hint') }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-4 border-t border-secondary-100 flex-shrink-0">
            <div class="flex justify-end">
              <button
                type="button"
                class="px-4 py-2 bg-secondary-100 hover:bg-secondary-200 text-secondary-700 rounded-lg transition-colors"
                @click="emit('close')"
              >
                {{ t('storyExamples.close') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Custom scrollbar for story content */
.story-content {
  scrollbar-width: thin;
  scrollbar-color: rgb(203 213 225) transparent;
}

.story-content::-webkit-scrollbar {
  width: 8px;
}

.story-content::-webkit-scrollbar-track {
  background: transparent;
}

.story-content::-webkit-scrollbar-thumb {
  background-color: rgb(203 213 225);
  border-radius: 4px;
}

.story-content::-webkit-scrollbar-thumb:hover {
  background-color: rgb(148 163 184);
}

/* Prose enhancements for checkboxes */
:deep(.prose ul) {
  list-style: none;
  padding-left: 0;
}

:deep(.prose li) {
  position: relative;
  padding-left: 1.75rem;
}

:deep(.prose li input[type="checkbox"]) {
  position: absolute;
  left: 0;
  top: 0.25rem;
  width: 1rem;
  height: 1rem;
  accent-color: #3b82f6;
}

/* Code block styling */
:deep(.prose pre) {
  background-color: rgb(30 41 59);
  border-radius: 0.5rem;
  padding: 1rem;
  overflow-x: auto;
  font-size: 0.875rem;
}

:deep(.prose pre code) {
  background: none;
  padding: 0;
  color: rgb(226 232 240);
}
</style>
