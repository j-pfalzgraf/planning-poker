<script setup lang="ts">
/**
 * IntegrationSettingsModal Component
 *
 * Modal for configuring Jira and GitHub integrations.
 * OAuth flow and field ID configuration.
 */

import type { IGitHubConfig, IJiraConfig } from '~/types/integration';
import { isValidGitHubRepo, isValidJiraFieldId } from '~/types/integration';

const { t } = useI18n()

/**
 * Props Definition
 */
interface Props {
  /** Is the modal visible? */
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
 * External integrations composable
 */
const {
  config,
  jiraStatus,
  githubStatus,
  isLoading,
  error,
  isJiraConnected,
  isGitHubConnected,
  connectJira,
  connectGitHub,
  disconnect,
  updateSettings,
} = useExternalIntegrations()

/**
 * Active tab
 */
const activeTab = ref<'jira' | 'github' | 'settings'>('jira')

/**
 * Jira form data
 */
const jiraForm = ref<IJiraConfig>({
  cloudUrl: config.value.jira?.cloudUrl || '',
  storyPointsFieldId: config.value.jira?.storyPointsFieldId || 'customfield_10016',
  defaultJql: config.value.jira?.defaultJql || '',
  projectKey: config.value.jira?.projectKey || '',
})

/**
 * GitHub form data
 */
const githubForm = ref<IGitHubConfig>({
  owner: config.value.github?.owner || '',
  repo: config.value.github?.repo || '',
  projectNumber: config.value.github?.projectNumber,
  storyPointsFieldId: config.value.github?.storyPointsFieldId || '',
  defaultLabels: [...(config.value.github?.defaultLabels || [])],
})

/**
 * General settings
 */
const autoSyncOnNext = ref(config.value.autoSyncOnNext)
const showExternalLinks = ref(config.value.showExternalLinks)

/**
 * Validation states
 */
const jiraUrlValid = computed(() => {
  if (!jiraForm.value.cloudUrl) return true
  try {
    new URL(jiraForm.value.cloudUrl)
    return jiraForm.value.cloudUrl.includes('atlassian.net')
  }
  catch {
    return false
  }
})

const jiraFieldIdValid = computed(() => {
  if (!jiraForm.value.storyPointsFieldId) return true
  return isValidJiraFieldId(jiraForm.value.storyPointsFieldId)
})

const githubRepoValid = computed(() => {
  if (!githubForm.value.owner || !githubForm.value.repo) return true
  return isValidGitHubRepo(`${githubForm.value.owner}/${githubForm.value.repo}`)
})

/**
 * Can submit Jira form
 */
const canSubmitJira = computed(() =>
  jiraForm.value.cloudUrl
  && jiraForm.value.storyPointsFieldId
  && jiraUrlValid.value
  && jiraFieldIdValid.value
  && !isLoading.value
)

/**
 * Can submit GitHub form
 */
const canSubmitGitHub = computed(() =>
  githubForm.value.owner
  && githubForm.value.repo
  && githubRepoValid.value
  && !isLoading.value
)

/**
 * Handle Jira connection
 */
async function handleConnectJira(): Promise<void> {
  if (!canSubmitJira.value) return
  await connectJira(jiraForm.value)
}

/**
 * Handle GitHub connection
 */
async function handleConnectGitHub(): Promise<void> {
  if (!canSubmitGitHub.value) return
  await connectGitHub(githubForm.value)
}

/**
 * Handle disconnection
 */
function handleDisconnect(provider: 'jira' | 'github'): void {
  disconnect(provider)
}

/**
 * Save settings
 */
function saveSettings(): void {
  updateSettings({
    autoSyncOnNext: autoSyncOnNext.value,
    showExternalLinks: showExternalLinks.value,
  })
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

/**
 * Reset forms when modal opens
 */
watch(() => props.visible, (isVisible) => {
  if (isVisible) {
    jiraForm.value = {
      cloudUrl: config.value.jira?.cloudUrl || '',
      storyPointsFieldId: config.value.jira?.storyPointsFieldId || 'customfield_10016',
      defaultJql: config.value.jira?.defaultJql || '',
      projectKey: config.value.jira?.projectKey || '',
    }
    githubForm.value = {
      owner: config.value.github?.owner || '',
      repo: config.value.github?.repo || '',
      projectNumber: config.value.github?.projectNumber,
      storyPointsFieldId: config.value.github?.storyPointsFieldId || '',
      defaultLabels: [...(config.value.github?.defaultLabels || [])],
    }
    autoSyncOnNext.value = config.value.autoSyncOnNext
    showExternalLinks.value = config.value.showExternalLinks
  }
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
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden max-h-[90vh] flex flex-col">
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b border-secondary-100">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-accent-100 rounded-lg text-accent-600">
                <Icon name="heroicons:cog-6-tooth" class="w-5 h-5" />
              </div>
              <h3 class="text-lg font-bold text-secondary-900">
                {{ t('integration.settings') }}
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

          <!-- Tabs -->
          <div class="flex border-b border-secondary-100">
            <button
              type="button"
              class="flex-1 py-3 px-4 text-sm font-medium transition-colors"
              :class="activeTab === 'jira' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-secondary-500 hover:text-secondary-700'"
              @click="activeTab = 'jira'"
            >
              <Icon name="simple-icons:jira" class="w-4 h-4 mr-2 inline-block" />
              Jira
            </button>
            <button
              type="button"
              class="flex-1 py-3 px-4 text-sm font-medium transition-colors"
              :class="activeTab === 'github' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-secondary-500 hover:text-secondary-700'"
              @click="activeTab = 'github'"
            >
              <Icon name="simple-icons:github" class="w-4 h-4 mr-2 inline-block" />
              GitHub
            </button>
            <button
              type="button"
              class="flex-1 py-3 px-4 text-sm font-medium transition-colors"
              :class="activeTab === 'settings' ? 'text-primary-600 border-b-2 border-primary-600' : 'text-secondary-500 hover:text-secondary-700'"
              @click="activeTab = 'settings'"
            >
              <Icon name="heroicons:adjustments-horizontal" class="w-4 h-4 mr-2 inline-block" />
              {{ t('integration.generalSettings') }}
            </button>
          </div>

          <!-- Content -->
          <div class="p-6 overflow-y-auto">
            <!-- Error -->
            <div v-if="error" class="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {{ error }}
            </div>

            <!-- Jira Tab -->
            <div v-if="activeTab === 'jira'" class="space-y-4">
              <!-- Connected Status -->
              <div v-if="isJiraConnected" class="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-500" />
                    <span class="text-green-700 font-medium">{{ t('integration.connected') }}</span>
                    <span v-if="jiraStatus.user" class="text-green-600 text-sm">
                      ({{ jiraStatus.user.name }})
                    </span>
                  </div>
                  <button
                    type="button"
                    class="text-sm text-red-600 hover:text-red-700"
                    @click="handleDisconnect('jira')"
                  >
                    {{ t('integration.disconnect') }}
                  </button>
                </div>
              </div>

              <!-- Jira Form -->
              <div class="space-y-4">
                <div>
                  <label for="jira-url" class="block text-sm font-medium text-secondary-700 mb-1">
                    {{ t('integration.jira.cloudUrl') }}
                  </label>
                  <input
                    id="jira-url"
                    v-model="jiraForm.cloudUrl"
                    type="url"
                    class="input"
                    :class="{ 'border-red-500': jiraForm.cloudUrl && !jiraUrlValid }"
                    placeholder="https://your-company.atlassian.net"
                    :disabled="isJiraConnected"
                  >
                  <p v-if="jiraForm.cloudUrl && !jiraUrlValid" class="mt-1 text-xs text-red-500">
                    {{ t('integration.jira.invalidUrl') }}
                  </p>
                </div>

                <div>
                  <label for="jira-field" class="block text-sm font-medium text-secondary-700 mb-1">
                    {{ t('integration.jira.storyPointsField') }}
                  </label>
                  <input
                    id="jira-field"
                    v-model="jiraForm.storyPointsFieldId"
                    type="text"
                    class="input"
                    :class="{ 'border-red-500': jiraForm.storyPointsFieldId && !jiraFieldIdValid }"
                    placeholder="customfield_10016"
                  >
                  <p class="mt-1 text-xs text-secondary-500">
                    {{ t('integration.jira.fieldIdHint') }}
                  </p>
                </div>

                <div>
                  <label for="jira-project" class="block text-sm font-medium text-secondary-700 mb-1">
                    {{ t('integration.jira.projectKey') }}
                    <span class="text-secondary-400 font-normal">({{ t('storyQueue.optional') }})</span>
                  </label>
                  <input
                    id="jira-project"
                    v-model="jiraForm.projectKey"
                    type="text"
                    class="input"
                    placeholder="PROJ"
                  >
                </div>

                <div>
                  <label for="jira-jql" class="block text-sm font-medium text-secondary-700 mb-1">
                    {{ t('integration.jira.defaultJql') }}
                    <span class="text-secondary-400 font-normal">({{ t('storyQueue.optional') }})</span>
                  </label>
                  <textarea
                    id="jira-jql"
                    v-model="jiraForm.defaultJql"
                    class="input min-h-[80px] resize-y"
                    placeholder='project = "PROJ" AND issuetype = Story AND sprint in openSprints()'
                  />
                </div>
              </div>

              <!-- Connect Button -->
              <div v-if="!isJiraConnected" class="pt-2">
                <button
                  type="button"
                  class="btn-primary w-full"
                  :disabled="!canSubmitJira"
                  @click="handleConnectJira"
                >
                  <Icon v-if="isLoading" name="heroicons:arrow-path" class="w-5 h-5 mr-2 animate-spin" />
                  <Icon v-else name="simple-icons:jira" class="w-5 h-5 mr-2" />
                  {{ t('integration.connectJira') }}
                </button>
              </div>
            </div>

            <!-- GitHub Tab -->
            <div v-if="activeTab === 'github'" class="space-y-4">
              <!-- Connected Status -->
              <div v-if="isGitHubConnected" class="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-2">
                    <Icon name="heroicons:check-circle" class="w-5 h-5 text-green-500" />
                    <span class="text-green-700 font-medium">{{ t('integration.connected') }}</span>
                    <span v-if="githubStatus.user" class="text-green-600 text-sm">
                      ({{ githubStatus.user.name }})
                    </span>
                  </div>
                  <button
                    type="button"
                    class="text-sm text-red-600 hover:text-red-700"
                    @click="handleDisconnect('github')"
                  >
                    {{ t('integration.disconnect') }}
                  </button>
                </div>
              </div>

              <!-- GitHub Form -->
              <div class="space-y-4">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label for="github-owner" class="block text-sm font-medium text-secondary-700 mb-1">
                      {{ t('integration.github.owner') }}
                    </label>
                    <input
                      id="github-owner"
                      v-model="githubForm.owner"
                      type="text"
                      class="input"
                      placeholder="organization"
                      :disabled="isGitHubConnected"
                    >
                  </div>
                  <div>
                    <label for="github-repo" class="block text-sm font-medium text-secondary-700 mb-1">
                      {{ t('integration.github.repo') }}
                    </label>
                    <input
                      id="github-repo"
                      v-model="githubForm.repo"
                      type="text"
                      class="input"
                      :class="{ 'border-red-500': githubForm.owner && githubForm.repo && !githubRepoValid }"
                      placeholder="repository"
                      :disabled="isGitHubConnected"
                    >
                  </div>
                </div>

                <div>
                  <label for="github-project" class="block text-sm font-medium text-secondary-700 mb-1">
                    {{ t('integration.github.projectNumber') }}
                    <span class="text-secondary-400 font-normal">({{ t('storyQueue.optional') }})</span>
                  </label>
                  <input
                    id="github-project"
                    v-model.number="githubForm.projectNumber"
                    type="number"
                    class="input"
                    placeholder="1"
                  >
                  <p class="mt-1 text-xs text-secondary-500">
                    {{ t('integration.github.projectHint') }}
                  </p>
                </div>

                <div v-if="githubForm.projectNumber">
                  <label for="github-field" class="block text-sm font-medium text-secondary-700 mb-1">
                    {{ t('integration.github.storyPointsField') }}
                  </label>
                  <input
                    id="github-field"
                    v-model="githubForm.storyPointsFieldId"
                    type="text"
                    class="input"
                    placeholder="PVTF_..."
                  >
                </div>
              </div>

              <!-- Connect Button -->
              <div v-if="!isGitHubConnected" class="pt-2">
                <button
                  type="button"
                  class="btn-primary w-full"
                  :disabled="!canSubmitGitHub"
                  @click="handleConnectGitHub"
                >
                  <Icon v-if="isLoading" name="heroicons:arrow-path" class="w-5 h-5 mr-2 animate-spin" />
                  <Icon v-else name="simple-icons:github" class="w-5 h-5 mr-2" />
                  {{ t('integration.connectGitHub') }}
                </button>
              </div>
            </div>

            <!-- Settings Tab -->
            <div v-if="activeTab === 'settings'" class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                <div>
                  <div class="font-medium text-secondary-900">{{ t('integration.autoSyncOnNext') }}</div>
                  <div class="text-sm text-secondary-500">{{ t('integration.autoSyncOnNextHint') }}</div>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="autoSyncOnNext" type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-secondary-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600" />
                </label>
              </div>

              <div class="flex items-center justify-between p-4 bg-secondary-50 rounded-lg">
                <div>
                  <div class="font-medium text-secondary-900">{{ t('integration.showExternalLinks') }}</div>
                  <div class="text-sm text-secondary-500">{{ t('integration.showExternalLinksHint') }}</div>
                </div>
                <label class="relative inline-flex items-center cursor-pointer">
                  <input v-model="showExternalLinks" type="checkbox" class="sr-only peer">
                  <div class="w-11 h-6 bg-secondary-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-secondary-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600" />
                </label>
              </div>

              <div class="pt-4">
                <button
                  type="button"
                  class="btn-primary w-full"
                  @click="saveSettings"
                >
                  {{ t('integration.saveSettings') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
