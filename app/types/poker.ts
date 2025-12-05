/**
 * TypeScript Typdefinitionen für Planning Poker
 *
 * Zentrale Typen für die gesamte Anwendung.
 * Folgt dem Interface-First Ansatz für bessere Typsicherheit.
 */

/**
 * Standard Poker-Kartenwerte
 * Fibonacci-basiert mit zusätzlichen Optionen
 */
export const POKER_VALUES = ['0', '0.5', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89', '?', '☕'] as const

/**
 * Typ für einen Poker-Kartenwert
 */
export type PokerValue = typeof POKER_VALUES[number]

/**
 * Join-Code Konstanten
 */
export const JOIN_CODE_LENGTH = 6
export const JOIN_CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789' // Ohne verwechselbare Zeichen

/**
 * Prüft ob ein Wert ein gültiger PokerValue ist
 *
 * @param value - Zu prüfender Wert
 */
export function isValidPokerValue(value: unknown): value is PokerValue {
  return typeof value === 'string' && (POKER_VALUES as readonly string[]).includes(value)
}

/**
 * Prüft ob ein Join-Code gültig formatiert ist
 *
 * @param code - Zu prüfender Code
 */
export function isValidJoinCode(code: string): boolean {
  if (code.length !== JOIN_CODE_LENGTH) return false
  return code.split('').every(char => JOIN_CODE_CHARS.includes(char))
}

/**
 * Formatiert einen Join-Code (Großbuchstaben, nur erlaubte Zeichen)
 *
 * @param code - Eingegebener Code
 */
export function formatJoinCode(code: string): string {
  return code
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, '')
    .slice(0, JOIN_CODE_LENGTH)
}

/**
 * Repräsentiert eine zu schätzende Story
 */
export interface IStory {
  /** Eindeutige ID der Story */
  id: string
  /** Titel der Story */
  title: string
  /** Beschreibung (Markdown) */
  description: string | null
  /** Bereits geschätzt? */
  estimated: boolean
  /** Geschätzter Wert (nach Abstimmung) */
  estimatedValue: PokerValue | null
}

/**
 * Repräsentiert einen Teilnehmer in einer Session
 */
export interface IParticipant {
  /** Eindeutige ID des Teilnehmers */
  id: string
  /** Anzeigename */
  name: string
  /** Gewählter Kartenwert (null wenn noch nicht gewählt) */
  selectedValue: PokerValue | null
  /** Ist der Teilnehmer ein Beobachter? */
  isObserver: boolean
  /** Zeitpunkt des Beitritts */
  joinedAt: Date
}

/**
 * Status einer Planning Poker Session
 */
export type SessionStatus = 'waiting' | 'voting' | 'revealed' | 'completed'

/**
 * Repräsentiert eine Planning Poker Session
 */
export interface ISession {
  /** Eindeutige Session-ID */
  id: string
  /** Name/Titel der Session */
  name: string
  /** Aktuelle Story/Task die geschätzt wird */
  currentStory: string | null
  /** Beschreibung der aktuellen Story (Markdown) */
  currentStoryDescription: string | null
  /** Liste aller Teilnehmer */
  participants: IParticipant[]
  /** Aktueller Status der Session */
  status: SessionStatus
  /** Sind die Karten aufgedeckt? */
  cardsRevealed: boolean
  /** Session-Ersteller ID */
  hostId: string
  /** Erstellungszeitpunkt */
  createdAt: Date
  /** Letztes Update */
  updatedAt: Date
  /** Index der aktuellen Story in der Queue */
  currentStoryIndex: number
  /** Queue mit vorbereiteten Storys */
  storyQueue: IStory[]
}

/**
 * Ergebnis einer Abstimmungsrunde
 */
export interface IVotingResult {
  /** Story die geschätzt wurde */
  story: string
  /** Beschreibung der Story */
  storyDescription: string | null
  /** Alle Votes mit Teilnehmer-ID */
  votes: Map<string, PokerValue>
  /** Durchschnittswert (nur numerische) */
  average: number | null
  /** Median-Wert (nur numerische) */
  median: number | null
  /** Häufigster Wert */
  mode: PokerValue | null
  /** Konsens erreicht? */
  hasConsensus: boolean
  /** Zeitstempel */
  timestamp: Date
}

/**
 * Konfiguration für eine Session
 */
export interface ISessionConfig {
  /** Verfügbare Kartenwerte */
  cardValues: readonly PokerValue[]
  /** Automatisch aufdecken wenn alle gewählt haben */
  autoReveal: boolean
  /** Timer für Abstimmung (in Sekunden, 0 = kein Timer) */
  votingTimeout: number
  /** Beobachter erlauben */
  allowObservers: boolean
}

/**
 * Event-Typen für WebSocket-Kommunikation
 */
export type SessionEventType =
  | 'participant:join'
  | 'participant:leave'
  | 'participant:vote'
  | 'session:reveal'
  | 'session:reset'
  | 'session:story:change'
  | 'session:status:change'

/**
 * Generisches Session-Event
 */
export interface ISessionEvent<T = unknown> {
  type: SessionEventType
  payload: T
  timestamp: Date
  participantId?: string
}

/**
 * Zustandsmanagement für die Session
 */
export interface ISessionState {
  session: ISession | null
  currentParticipant: IParticipant | null
  isHost: boolean
  isConnected: boolean
  error: string | null
}
