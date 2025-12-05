<script setup lang="ts">
/**
 * SessionControls Component
 *
 * Control elements for the session host.
 */

const { t } = useI18n()

/**
 * Props Definition
 */
interface Props {
  /** Is the user the host? */
  isHost: boolean
  /** Current session status */
  status: 'waiting' | 'voting' | 'revealed' | 'completed'
  /** Are all votes in? */
  allVotesIn: boolean
  /** Current story */
  currentStory?: string | null
  /** Is there a story queue? */
  hasStoryQueue?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  currentStory: null,
  hasStoryQueue: false,
})

/**
 * Events Definition
 */
const emit = defineEmits<{
  /** Starts a new voting round */
  startVoting: [story: string, description?: string]
  /** Reveals the cards */
  reveal: []
  /** Resets the round */
  reset: []
  /** Next story from queue */
  nextStory: []
}>()

/**
 * Story input value
 */
const storyInput = ref('')
const descriptionInput = ref('')

/**
 * Starts the voting
 */
function handleStartVoting(): void {
  if (storyInput.value.trim()) {
    emit('startVoting', storyInput.value.trim(), descriptionInput.value.trim() || undefined)
    storyInput.value = ''
    descriptionInput.value = ''
  }
}
</script>

<template>
  <div v-if="props.isHost" class="session-controls bg-white rounded-xl shadow-sm border border-secondary-200 p-6">
    <div class="flex items-center gap-2 mb-4">
      <div class="p-2 bg-primary-100 rounded-lg text-primary-600">
        <Icon name="heroicons:adjustments-horizontal" class="w-5 h-5" />
      </div>
      <h3 class="text-lg font-bold text-secondary-900">
        {{ t('controls.startVoting') }}
      </h3>
    </div>

    <!-- Start new round (only when no story queue) -->
    <div v-if="(props.status === 'waiting' || props.status === 'revealed') && !props.hasStoryQueue" class="space-y-3">
      <div>
        <label for="story-input" class="block text-sm font-medium text-secondary-700 mb-1">
          {{ t('controls.storyTitle') }}
        </label>
        <input
          id="story-input"
          v-model="storyInput"
          type="text"
          class="input"
          :placeholder="t('controls.storyTitlePlaceholder')"
          @keyup.enter="handleStartVoting"
        >
      </div>

      <div>
        <label for="story-desc" class="block text-sm font-medium text-secondary-700 mb-1">
          {{ t('controls.description') }}
        </label>
        <textarea
          id="story-desc"
          v-model="descriptionInput"
          class="input min-h-[100px] resize-y"
          :placeholder="t('controls.descriptionPlaceholder')"
        />
      </div>

      <button
        type="button"
        class="btn-primary w-full"
        :disabled="!storyInput.trim()"
        @click="handleStartVoting"
      >
        <Icon name="heroicons:play" class="w-5 h-5 mr-2" />
        {{ t('controls.startVoting') }}
      </button>
    </div>

    <!-- Waiting for start (with story queue) -->
    <div v-else-if="props.status === 'waiting' && props.hasStoryQueue" class="text-center py-4">
      <Icon name="heroicons:queue-list" class="w-8 h-8 text-secondary-300 mx-auto mb-2" />
      <p class="text-sm text-secondary-500">
        {{ t('storyQueue.title') }}
      </p>
    </div>

    <!-- Active voting -->
    <div v-else-if="props.status === 'voting'" class="space-y-3">
      <div class="p-3 bg-primary-50 rounded-lg">
        <div class="text-xs text-primary-600 mb-1">{{ t('session.currentStory') }}</div>
        <div class="font-medium text-primary-800">{{ props.currentStory }}</div>
      </div>

      <button
        type="button"
        class="btn-primary w-full"
        :class="{ 'animate-pulse': props.allVotesIn }"
        @click="emit('reveal')"
      >
        <Icon name="heroicons:eye" class="w-5 h-5 mr-2" />
        {{ t('controls.revealCards') }}
        <span v-if="props.allVotesIn" class="ml-2 text-xs">({{ t('controls.allVotesIn') }})</span>
      </button>

      <button
        type="button"
        class="btn-secondary w-full"
        @click="emit('reset')"
      >
        <Icon name="heroicons:arrow-path" class="w-5 h-5 mr-2" />
        {{ t('controls.resetVoting') }}
      </button>
    </div>

    <!-- Results shown (with story queue) -->
    <div v-else-if="props.status === 'revealed' && props.hasStoryQueue" class="space-y-3">
      <div class="p-3 bg-green-50 rounded-lg border border-green-200">
        <div class="text-xs text-green-600 mb-1">{{ t('results.title') }}</div>
        <div class="font-medium text-green-800">{{ props.currentStory }}</div>
      </div>

      <button
        type="button"
        class="btn-primary w-full"
        @click="emit('nextStory')"
      >
        <Icon name="heroicons:forward" class="w-5 h-5 mr-2" />
        {{ t('controls.nextStory') }}
      </button>

      <button
        type="button"
        class="btn-secondary w-full"
        @click="emit('reset')"
      >
        <Icon name="heroicons:arrow-path" class="w-5 h-5 mr-2" />
        {{ t('controls.resetVoting') }}
      </button>
    </div>
  </div>
</template>
