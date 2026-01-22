<script setup lang="ts">
/**
 * CreateSessionForm Component
 *
 * Form for creating a new Planning Poker session.
 */

const { t } = useI18n()

/**
 * Events Definition
 */
const emit = defineEmits<{
  /** Emitted when the session should be created */
  create: [sessionName: string, participantName: string]
}>()

/**
 * Form data
 */
const sessionName = ref('')
const participantName = ref('')

/**
 * Validation
 */
const isValid = computed(() =>
  sessionName.value.trim().length > 0 &&
  participantName.value.trim().length > 0
)

/**
 * Handles form submission
 */
function handleSubmit(): void {
  if (isValid.value) {
    emit('create', sessionName.value.trim(), participantName.value.trim())
  }
}
</script>

<template>
  <form class="card-container max-w-md mx-auto" @submit.prevent="handleSubmit">
    <h2 class="text-xl font-bold text-secondary-800 mb-6 text-center">
      {{ t('session.create.title') }}
    </h2>

    <div class="space-y-4">
      <div>
        <label for="session-name" class="block text-sm font-medium text-secondary-700 mb-1">
          {{ t('session.create.sessionName') }}
        </label>
        <input
          id="session-name"
          v-model="sessionName"
          type="text"
          class="input"
          :placeholder="t('session.create.sessionNamePlaceholder')"
          required
        >
      </div>

      <div>
        <label for="participant-name" class="block text-sm font-medium text-secondary-700 mb-1">
          {{ t('session.create.yourName') }}
        </label>
        <input
          id="participant-name"
          v-model="participantName"
          type="text"
          class="input"
          :placeholder="t('session.create.yourNamePlaceholder')"
          required
        >
      </div>

      <button
        type="submit"
        class="btn-primary w-full"
        :disabled="!isValid"
      >
        <Icon name="heroicons:plus" class="w-5 h-5 mr-2" />
        {{ t('session.create.button') }}
      </button>
    </div>
  </form>
</template>
