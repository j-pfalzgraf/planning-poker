<script setup lang="ts">
/**
 * Index Seite
 *
 * Startseite der Planning Poker Anwendung.
 * Ermöglicht das Erstellen einer neuen Session oder zeigt die aktive Session.
 */

import { marked } from 'marked'

/**
 * Session Composable für Zustandsverwaltung
 */
const {
  session,
  currentParticipant,
  isHost,
  voters,
  allVotesIn,
  joinCode,
  error,
  connectionStatus,
  createSession,
  joinSession,
  selectCard,
  revealCards,
  startVoting,
  addStory,
  removeStory,
  nextStory,
  resetVoting,
  leaveSession,
  clearError,
} = useSession()

/**
 * Parsed Markdown Description
 */
const parsedDescription = computed(() => {
  if (!session.value?.currentStoryDescription) return ''
  return marked.parse(session.value.currentStoryDescription) as string
})

/**
 * Story Preview Modal State
 */
const showStoryPreview = ref(false)

/**
 * Route für Join-Code aus URL
 */
const route = useRoute()

/**
 * Aktueller Modus: 'create' oder 'join'
 */
const mode = ref<'create' | 'join'>('create')

/**
 * Join-Code aus URL (für Vorausfüllen)
 */
const initialJoinCode = ref('')

/**
 * Join-Code aus URL Parameter
 */
onMounted(() => {
  const urlJoinCode = route.query.join as string
  if (urlJoinCode) {
    mode.value = 'join'
    initialJoinCode.value = urlJoinCode.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 6)
  }
})

/**
 * SEO Meta-Daten
 */
useSeoMeta({
  title: 'Planning Poker - Agile Schätzungen leicht gemacht',
  description: 'Kostenloses Planning Poker Tool für agile Teams. Schätze User Stories gemeinsam mit deinem Team.',
})

/**
 * Behandelt das Erstellen einer neuen Session
 */
function handleCreateSession(sessionName: string, participantName: string): void {
  createSession(sessionName, participantName)
}

/**
 * Behandelt das Beitreten einer Session
 */
function handleJoinSession(code: string, participantName: string, asObserver: boolean): void {
  joinSession(code, participantName, asObserver)
}

/**
 * Wechselt den Modus
 */
function switchMode(newMode: 'create' | 'join'): void {
  mode.value = newMode
  clearError()
}
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-secondary-200/50">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <Icon name="heroicons:squares-2x2" class="w-8 h-8 text-primary-600" />
            <h1 class="text-xl font-bold text-secondary-800">
              Planning Poker
            </h1>
            <!-- Connection Status -->
            <div
              class="flex items-center gap-1.5 text-xs px-2 py-1 rounded-full"
              :class="{
                'bg-success-100 text-success-700': connectionStatus === 'connected',
                'bg-warning-100 text-warning-700': connectionStatus === 'connecting',
                'bg-secondary-100 text-secondary-600': connectionStatus === 'disconnected',
                'bg-error-100 text-error-700': connectionStatus === 'error',
              }"
            >
              <span
                class="w-2 h-2 rounded-full"
                :class="{
                  'bg-success-500': connectionStatus === 'connected',
                  'bg-warning-500 animate-pulse': connectionStatus === 'connecting',
                  'bg-secondary-400': connectionStatus === 'disconnected',
                  'bg-error-500': connectionStatus === 'error',
                }"
              />
              <span class="hidden sm:inline">
                {{ connectionStatus === 'connected' ? 'Verbunden' :
                   connectionStatus === 'connecting' ? 'Verbinde...' :
                   connectionStatus === 'error' ? 'Fehler' : 'Offline' }}
              </span>
            </div>
          </div>

          <div v-if="session" class="text-sm text-secondary-600">
            Session: <span class="font-medium">{{ session.name }}</span>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Keine Session aktiv - Formular anzeigen -->
      <div v-if="!session" class="py-12">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-secondary-800 mb-2">
            Willkommen bei Planning Poker
          </h2>
          <p class="text-secondary-600">
            Starte eine neue Session oder tritt einer bestehenden bei.
          </p>
        </div>

        <!-- Mode Tabs -->
        <div class="flex justify-center mb-8">
          <div class="inline-flex rounded-lg bg-secondary-100 p-1">
            <button
              type="button"
              class="px-4 py-2 rounded-md text-sm font-medium transition-all"
              :class="mode === 'create'
                ? 'bg-white shadow text-primary-700'
                : 'text-secondary-600 hover:text-secondary-800'"
              @click="switchMode('create')"
            >
              <Icon name="heroicons:plus" class="w-4 h-4 inline mr-1" />
              Neue Session
            </button>
            <button
              type="button"
              class="px-4 py-2 rounded-md text-sm font-medium transition-all"
              :class="mode === 'join'
                ? 'bg-white shadow text-primary-700'
                : 'text-secondary-600 hover:text-secondary-800'"
              @click="switchMode('join')"
            >
              <Icon name="heroicons:arrow-right-on-rectangle" class="w-4 h-4 inline mr-1" />
              Beitreten
            </button>
          </div>
        </div>

        <!-- Create or Join Form -->
        <CreateSessionForm
          v-if="mode === 'create'"
          @create="handleCreateSession"
        />

        <JoinSessionForm
          v-else
          :error="error"
          :initial-code="initialJoinCode"
          @join="handleJoinSession"
          @switch-to-create="switchMode('create')"
          @clear-error="clearError"
        />

        <!-- Features -->
        <div class="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <div class="text-center p-6 bg-white rounded-xl shadow-sm border border-secondary-100 hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:users" class="w-6 h-6 text-primary-600" />
            </div>
            <h3 class="font-semibold text-secondary-800 mb-2">Team-Schätzungen</h3>
            <p class="text-sm text-secondary-600">
              Schätze gemeinsam mit deinem Team in Echtzeit.
            </p>
          </div>

          <div class="text-center p-6 bg-white rounded-xl shadow-sm border border-secondary-100 hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:chart-bar" class="w-6 h-6 text-accent-600" />
            </div>
            <h3 class="font-semibold text-secondary-800 mb-2">Statistiken</h3>
            <p class="text-sm text-secondary-600">
              Sieh Durchschnitt, Median und Verteilung der Votes.
            </p>
          </div>

          <div class="text-center p-6 bg-white rounded-xl shadow-sm border border-secondary-100 hover:shadow-md transition-shadow">
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="heroicons:bolt" class="w-6 h-6 text-green-600" />
            </div>
            <h3 class="font-semibold text-secondary-800 mb-2">Schnell & Einfach</h3>
            <p class="text-sm text-secondary-600">
              Keine Registrierung nötig. Sofort loslegen!
            </p>
          </div>
        </div>
      </div>

      <!-- Session aktiv -->
      <div v-else class="grid lg:grid-cols-12 gap-6">
        <!-- Linke Spalte: Session-Info, Teilnehmer & Steuerung -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Session Info mit Join-Code -->
          <SessionInfo
            :session-name="session.name"
            :join-code="joinCode"
            :participant-count="session.participants.length"
            @leave="leaveSession"
          />

          <ParticipantList
            :participants="session.participants"
            :revealed="session.cardsRevealed"
            :current-user-id="currentParticipant?.id"
          />

          <SessionControls
            :is-host="isHost"
            :status="session.status"
            :all-votes-in="allVotesIn"
            :current-story="session.currentStory"
            :has-story-queue="session.storyQueue.length > 0"
            @start-voting="startVoting"
            @reveal="revealCards"
            @reset="resetVoting"
            @next-story="nextStory"
          />

          <!-- Story Queue (nur Host) -->
          <StoryQueue
            v-if="isHost"
            :stories="session.storyQueue"
            :current-index="session.currentStoryIndex"
            :is-host="isHost"
            :status="session.status"
            @add-story="addStory"
            @remove-story="removeStory"
            @next-story="nextStory"
          />
        </div>

        <!-- Mittlere Spalte: Hauptbereich -->
                <!-- Mittlere Spalte: Hauptbereich -->
        <div class="lg:col-span-6">
          <Transition name="slide-up" mode="out-in">
            <!-- Aktuelle Story -->
            <div v-if="session.currentStory" class="card-container mb-6">
              <div class="flex items-center justify-between mb-1">
                <div class="text-xs text-secondary-500">Aktuelle Story</div>
                <button
                  v-if="session.currentStoryDescription"
                  type="button"
                  class="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1"
                  @click="showStoryPreview = true"
                >
                  <Icon name="heroicons:eye" class="w-3 h-3" />
                  Details anzeigen
                </button>
              </div>
              <h2 class="text-xl font-bold text-secondary-800 mb-2">
                {{ session.currentStory }}
              </h2>
              <!-- eslint-disable-next-line vue/no-v-html -->
              <div
                v-if="session.currentStoryDescription"
                class="prose prose-sm max-w-none text-secondary-600 bg-secondary-50 p-3 rounded-lg line-clamp-3"
                v-html="parsedDescription"
              />
            </div>

            <!-- Warte-Status -->
            <div v-else class="card-container mb-6 text-center py-8">
              <Icon name="heroicons:clock" class="w-12 h-12 text-secondary-300 mx-auto mb-4" />
              <p class="text-secondary-500">
                Warte auf den Host, um die nächste Runde zu starten...
              </p>
            </div>
          </Transition>

          <Transition name="slide-up" mode="out-in">
            <!-- Kartenauswahl -->
            <div
              v-if="session.status === 'voting' && !currentParticipant?.isObserver"
              class="card-container"
            >
              <CardDeck
                :selected-value="currentParticipant?.selectedValue ?? null"
                :disabled="session.cardsRevealed"
                @select="selectCard"
              />
            </div>

            <!-- Beobachter-Hinweis -->
            <div
              v-else-if="currentParticipant?.isObserver"
              class="card-container text-center py-8"
            >
              <Icon name="heroicons:eye" class="w-12 h-12 text-secondary-300 mx-auto mb-4" />
              <p class="text-secondary-500">
                Du bist als Beobachter dabei und kannst nicht abstimmen.
              </p>
            </div>
          </Transition>
        </div>

        <!-- Rechte Spalte: Ergebnisse -->
        <div class="lg:col-span-3">
          <Transition name="slide-up" mode="out-in">
            <div v-if="session.cardsRevealed">
              <VotingResult
                :participants="voters"
                :story="session.currentStory"
                :description="session.currentStoryDescription"
              />
            </div>

            <div v-else class="card-container text-center py-8">
              <Icon name="heroicons:eye-slash" class="w-12 h-12 text-secondary-300 mx-auto mb-4" />
              <p class="text-secondary-500">
                Die Ergebnisse werden angezeigt, sobald die Karten aufgedeckt sind.
              </p>
            </div>
          </Transition>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="mt-auto py-6 text-center text-sm text-secondary-500">
      <p>
        Planning Poker - Entwickelt mit
        <Icon name="heroicons:heart-solid" class="w-4 h-4 inline text-error-500" />
        und Nuxt 3
      </p>
    </footer>

    <!-- Story Preview Modal -->
    <StoryPreview
      v-if="session"
      :visible="showStoryPreview"
      :title="session.currentStory || ''"
      :description="session.currentStoryDescription"
      @close="showStoryPreview = false"
    />
  </div>
</template>
