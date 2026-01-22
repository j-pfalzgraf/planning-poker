<script setup lang="ts">
/**
 * ImportStoriesModal Component
 *
 * Modal for importing stories from Jira or GitHub.
 */

import type { IExternalIssue, IImportFilter, IntegrationProvider } from '~/types/integration';

const { t } = useI18n()

/**
 * Props Definition
 */
interface Props {
  /** Is the modal visible? */
  visible: boolean
  /** Current session ID */
  sessionId: string
}

const props = defineProps<Props>()

/**
 * Events Definition
 */
const emit = defineEmits<{
  close: []
  import: [stories: Array<{ title: string; description?: string; externalIssue: IExternalIssue }>]
}>()

/**
 * External integrations composable
 */
const {
  isJiraConnected,
  isGitHubConnected,
  hasAnyIntegration,
  jiraConfig,
  githubConfig,
  fetchedIssues,
  isLoading,
  error,
  fetchIssues,
} = useExternalIntegrations()

/**
 * Selected provider
 */
const selectedProvider = ref<IntegrationProvider | null>(null)

/**
 * Filter settings
 */
const filter = ref<IImportFilter>({
  provider: 'jira',
  jql: '',
  labels: [],
  state: 'open',
  limit: 50,
})

/**
 * Selected issues for import
 */
const selectedIssues = ref<Set<string>>(new Set())

/**
 * Has fetched issues
 */
const hasFetched = ref(false)

/**
 * Initialize provider on open
 */
watch(() => props.visible, (isVisible) => {
  if (isVisible) {
    selectedIssues.value = new Set()
    hasFetched.value = false

    // Auto-select first available provider
    if (isJiraConnected.value) {
      selectedProvider.value = 'jira'
      filter.value.provider = 'jira'
      filter.value.jql = jiraConfig.value?.defaultJql || ''
    }
    else if (isGitHubConnected.value) {
      selectedProvider.value = 'github-issues'
      filter.value.provider = 'github-issues'
    }
  }
})

/**
 * Fetch issues from selected provider
 */
async function handleFetch(): Promise<void> {
  if (!selectedProvider.value) return

  filter.value.provider = selectedProvider.value
  await fetchIssues(filter.value)
  hasFetched.value = true
  selectedIssues.value = new Set()
}

/**
 * Toggle issue selection
 */
function toggleIssue(issueId: string): void {
  if (selectedIssues.value.has(issueId)) {
    selectedIssues.value.delete(issueId)
  }
  else {
    selectedIssues.value.add(issueId)
  }
  // Trigger reactivity
  selectedIssues.value = new Set(selectedIssues.value)
}

/**
 * Select all issues
 */
function selectAll(): void {
  selectedIssues.value = new Set(fetchedIssues.value.map(i => i.id))
}

/**
 * Clear selection
 */
function clearSelection(): void {
  selectedIssues.value = new Set()
}

/**
 * Import selected issues
 */
function handleImport(): void {
  const stories = fetchedIssues.value
    .filter(issue => selectedIssues.value.has(issue.id))
    .map(issue => ({
      title: `[${issue.key}] ${issue.title}`,
      description: issue.description,
      externalIssue: {
        ...issue,
        labels: [...issue.labels],
      } as IExternalIssue,
    }))

  emit('import', stories)
  emit('close')
}

/**
 * Handle escape key
 */
function handleKeydown(e: KeyboardEvent): void {
  if (e.key === 'Escape') {
    emit('close')
  }
}

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
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden max-h-[90vh] flex flex-col">
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-secondary-100">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-primary-100 rounded-lg text-primary-600">
                <Icon name="heroicons:cloud-arrow-down" class="w-5 h-5" />
              </div>
              <h3 class="text-lg font-bold text-secondary-900">
                {{ t('integration.importStories') }}
              </h3>
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
          <div class="flex-1 overflow-y-auto p-6">
            <!-- No integration connected -->
            <div v-if="!hasAnyIntegration" class="text-center py-8">
              <Icon name="heroicons:link-slash" class="w-12 h-12 mx-auto text-secondary-300 mb-4" />
              <p class="text-secondary-600 mb-4">{{ t('integration.noIntegration') }}</p>
              <p class="text-sm text-secondary-500">{{ t('integration.noIntegrationHint') }}</p>
            </div>

            <!-- Provider Selection -->
            <div v-else class="space-y-4">
              <!-- Provider Tabs -->
              <div class="flex gap-2">
                <button
                  v-if="isJiraConnected"
                  type="button"
                  class="flex-1 py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2"
                  :class="selectedProvider === 'jira'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-secondary-200 hover:border-secondary-300 text-secondary-600'"
                  @click="selectedProvider = 'jira'; filter.provider = 'jira'"
                >
                  <Icon name="simple-icons:jira" class="w-5 h-5" />
                  Jira
                </button>
                <button
                  v-if="isGitHubConnected"
                  type="button"
                  class="flex-1 py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2"
                  :class="selectedProvider === 'github-issues'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-secondary-200 hover:border-secondary-300 text-secondary-600'"
                  @click="selectedProvider = 'github-issues'; filter.provider = 'github-issues'"
                >
                  <Icon name="simple-icons:github" class="w-5 h-5" />
                  GitHub Issues
                </button>
                <button
                  v-if="isGitHubConnected && githubConfig?.projectNumber"
                  type="button"
                  class="flex-1 py-3 px-4 rounded-lg border-2 transition-all flex items-center justify-center gap-2"
                  :class="selectedProvider === 'github-projects'
                    ? 'border-primary-500 bg-primary-50 text-primary-700'
                    : 'border-secondary-200 hover:border-secondary-300 text-secondary-600'"
                  @click="selectedProvider = 'github-projects'; filter.provider = 'github-projects'"
                >
                  <Icon name="heroicons:view-columns" class="w-5 h-5" />
                  GitHub Projects
                </button>
              </div>

              <!-- Jira Filter -->
              <div v-if="selectedProvider === 'jira'" class="space-y-3">
                <div>
                  <label for="jql-filter" class="block text-sm font-medium text-secondary-700 mb-1">
                    {{ t('integration.jira.jqlFilter') }}
                  </label>
                  <textarea
                    id="jql-filter"
                    v-model="filter.jql"
                    class="input min-h-[60px] resize-y text-sm font-mono"
                    placeholder="project = PROJ AND issuetype = Story"
                  />
                </div>
              </div>

              <!-- GitHub Filter -->
              <div v-if="selectedProvider?.startsWith('github')" class="space-y-3">
                <div class="flex gap-3">
                  <div class="flex-1">
                    <label for="gh-state" class="block text-sm font-medium text-secondary-700 mb-1">
                      {{ t('integration.github.state') }}
                    </label>
                    <select id="gh-state" v-model="filter.state" class="input">
                      <option value="open">{{ t('integration.github.stateOpen') }}</option>
                      <option value="closed">{{ t('integration.github.stateClosed') }}</option>
                      <option value="all">{{ t('integration.github.stateAll') }}</option>
                    </select>
                  </div>
                  <div class="flex-1">
                    <label for="gh-limit" class="block text-sm font-medium text-secondary-700 mb-1">
                      {{ t('integration.limit') }}
                    </label>
                    <input
                      id="gh-limit"
                      v-model.number="filter.limit"
                      type="number"
                      class="input"
                      min="1"
                      max="100"
                    >
                  </div>
                </div>
              </div>

              <!-- Fetch Button -->
              <button
                type="button"
                class="btn-primary w-full"
                :disabled="!selectedProvider || isLoading"
                @click="handleFetch"
              >
                <Icon v-if="isLoading" name="heroicons:arrow-path" class="w-5 h-5 mr-2 animate-spin" />
                <Icon v-else name="heroicons:magnifying-glass" class="w-5 h-5 mr-2" />
                {{ t('integration.fetchIssues') }}
              </button>

              <!-- Error -->
              <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {{ error }}
              </div>

              <!-- Results -->
              <div v-if="hasFetched" class="space-y-3">
                <div class="flex items-center justify-between">
                  <span class="text-sm text-secondary-600">
                    {{ fetchedIssues.length }} {{ t('integration.issuesFound') }}
                  </span>
                  <div v-if="fetchedIssues.length > 0" class="flex gap-2">
                    <button
                      type="button"
                      class="text-sm text-primary-600 hover:text-primary-700"
                      @click="selectAll"
                    >
                      {{ t('integration.selectAll') }}
                    </button>
                    <span class="text-secondary-300">|</span>
                    <button
                      type="button"
                      class="text-sm text-secondary-600 hover:text-secondary-700"
                      @click="clearSelection"
                    >
                      {{ t('integration.clearSelection') }}
                    </button>
                  </div>
                </div>

                <!-- Issue List -->
                <div v-if="fetchedIssues.length > 0" class="max-h-[300px] overflow-y-auto space-y-2 border border-secondary-200 rounded-lg p-2">
                  <div
                    v-for="issue in fetchedIssues"
                    :key="issue.id"
                    class="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors"
                    :class="selectedIssues.has(issue.id) ? 'bg-primary-50 border border-primary-200' : 'bg-secondary-50 hover:bg-secondary-100'"
                    @click="toggleIssue(issue.id)"
                  >
                    <div class="pt-0.5">
                      <div
                        class="w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
                        :class="selectedIssues.has(issue.id) ? 'bg-primary-500 border-primary-500' : 'border-secondary-300'"
                      >
                        <Icon
                          v-if="selectedIssues.has(issue.id)"
                          name="heroicons:check"
                          class="w-3 h-3 text-white"
                        />
                      </div>
                    </div>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-mono text-secondary-500">{{ issue.key }}</span>
                        <span v-if="issue.type" class="text-xs px-1.5 py-0.5 bg-secondary-200 rounded">
                          {{ issue.type }}
                        </span>
                      </div>
                      <div class="font-medium text-secondary-900 truncate">
                        {{ issue.title }}
                      </div>
                      <div v-if="issue.labels.length" class="flex flex-wrap gap-1 mt-1">
                        <span
                          v-for="label in issue.labels.slice(0, 3)"
                          :key="label"
                          class="text-xs px-1.5 py-0.5 bg-accent-100 text-accent-700 rounded"
                        >
                          {{ label }}
                        </span>
                        <span v-if="issue.labels.length > 3" class="text-xs text-secondary-500">
                          +{{ issue.labels.length - 3 }}
                        </span>
                      </div>
                    </div>
                    <a
                      :href="issue.url"
                      target="_blank"
                      class="text-secondary-400 hover:text-primary-500"
                      @click.stop
                    >
                      <Icon name="heroicons:arrow-top-right-on-square" class="w-4 h-4" />
                    </a>
                  </div>
                </div>

                <!-- Empty State -->
                <div v-else class="text-center py-6 text-secondary-500">
                  <Icon name="heroicons:inbox" class="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p class="text-sm">{{ t('integration.noIssuesFound') }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div v-if="hasAnyIntegration && selectedIssues.size > 0" class="p-4 border-t border-secondary-100 bg-secondary-50">
            <button
              type="button"
              class="btn-primary w-full"
              @click="handleImport"
            >
              <Icon name="heroicons:arrow-down-tray" class="w-5 h-5 mr-2" />
              {{ t('integration.importSelected', { count: selectedIssues.size }) }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
