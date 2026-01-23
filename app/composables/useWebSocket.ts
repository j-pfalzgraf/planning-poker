/**
 * useWebSocket Composable
 *
 * Manages the WebSocket connection to the server.
 * Provides reactive connection status information and message handling.
 */

import type { Ref } from 'vue'
import type { ClientMessage, ServerMessage, ServerMessageType } from '~/types/websocket'

/**
 * WebSocket connection status
 */
export type ConnectionStatus = 'disconnected' | 'connecting' | 'connected' | 'error'

/**
 * Event handler type
 */
type MessageHandler<T = unknown> = (payload: T) => void

/**
 * WebSocket composable options
 */
interface UseWebSocketOptions {
  /** Automatically connect on mount */
  autoConnect?: boolean
  /** Automatically reconnect on connection loss */
  autoReconnect?: boolean
  /** Maximum number of reconnect attempts */
  maxReconnectAttempts?: number
  /** Delay between reconnects in ms */
  reconnectDelay?: number
}

/**
 * WebSocket composable return type
 */
interface UseWebSocketReturn {
  /** Current connection status */
  status: Ref<ConnectionStatus>
  /** Establish connection */
  connect: () => void
  /** Disconnect */
  disconnect: () => void
  /** Send message */
  send: <T>(type: ClientMessage['type'], payload: T) => void
  /** Register event handler */
  on: <T>(type: ServerMessageType, handler: MessageHandler<T>) => () => void
  /** One-time event handler */
  once: <T>(type: ServerMessageType, handler: MessageHandler<T>) => void
}

/**
 * Client-only singleton state for WebSocket
 * Lazily initialized to prevent SSR state pollution
 */
interface ClientSingletonState {
  ws: WebSocket | null
  reconnectAttempts: number
  reconnectTimer: ReturnType<typeof setTimeout> | null
  pingInterval: ReturnType<typeof setInterval> | null
  handlers: Map<ServerMessageType, Set<MessageHandler>>
  isInitialized: boolean
}

let clientState: ClientSingletonState | null = null

/**
 * Get or create client-only singleton state
 */
function getClientState(): ClientSingletonState {
  if (!clientState) {
    clientState = {
      ws: null,
      reconnectAttempts: 0,
      reconnectTimer: null,
      pingInterval: null,
      handlers: new Map(),
      isInitialized: false,
    }
  }
  return clientState
}

/**
 * useWebSocket Composable
 *
 * @param options - Configuration options
 * @returns WebSocket management functions
 *
 * @example
 * ```ts
 * const { status, connect, send, on } = useWebSocket()
 *
 * on('session:updated', (payload) => {
 *   console.log('Session updated:', payload)
 * })
 *
 * send('session:create', { sessionName: 'Sprint 1', participantName: 'Max' })
 * ```
 */
export function useWebSocket(options: UseWebSocketOptions = {}): UseWebSocketReturn {
  const {
    autoConnect = true,
    autoReconnect = true,
    maxReconnectAttempts = 5,
    reconnectDelay = 1000,
  } = options

  /**
   * Use useState for SSR-safe reactive status
   * This ensures each SSR request gets its own status ref
   */
  const status = useState<ConnectionStatus>('ws-status', () => 'disconnected')

  /**
   * SSR-safe no-op implementations
   */
  if (!import.meta.client) {
    return {
      status,
      connect: () => {},
      disconnect: () => {},
      send: () => {},
      on: () => () => {},
      once: () => {},
    }
  }

  // Client-only code below
  const state = getClientState()

  /**
   * Generate WebSocket URL
   */
  function getWebSocketUrl(): string {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
    return `${protocol}//${window.location.host}/_ws`
  }

  /**
   * Call event handlers
   */
  function emitEvent(type: ServerMessageType, payload: unknown): void {
    const typeHandlers = state.handlers.get(type)
    if (typeHandlers) {
      typeHandlers.forEach(handler => handler(payload))
    }
  }

  /**
   * Establish connection
   */
  function connect(): void {
    if (state.ws?.readyState === WebSocket.OPEN) return

    status.value = 'connecting'

    try {
      state.ws = new WebSocket(getWebSocketUrl())

      state.ws.onopen = () => {
        status.value = 'connected'
        state.reconnectAttempts = 0
        console.log('[WebSocket] Connected')

        // Start ping interval
        state.pingInterval = setInterval(() => {
          if (state.ws?.readyState === WebSocket.OPEN) {
            send('ping', {})
          }
        }, 30000)
      }

      state.ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data) as ServerMessage
          emitEvent(message.type, message.payload)
        }
        catch (error) {
          console.error('[WebSocket] Error parsing message:', error)
        }
      }

      state.ws.onclose = () => {
        status.value = 'disconnected'
        cleanup()
        console.log('[WebSocket] Disconnected')

        // Auto-Reconnect
        if (autoReconnect && state.reconnectAttempts < maxReconnectAttempts) {
          state.reconnectAttempts++
          const delay = reconnectDelay * Math.pow(2, state.reconnectAttempts - 1)
          console.log(`[WebSocket] Reconnecting in ${delay}ms (attempt ${state.reconnectAttempts}/${maxReconnectAttempts})`)

          state.reconnectTimer = setTimeout(() => {
            connect()
          }, delay)
        }
      }

      state.ws.onerror = (error) => {
        status.value = 'error'
        console.error('[WebSocket] Error:', error)
      }
    }
    catch (error) {
      status.value = 'error'
      console.error('[WebSocket] Failed to connect:', error)
    }
  }

  /**
   * Cleanup
   */
  function cleanup(): void {
    if (state.pingInterval) {
      clearInterval(state.pingInterval)
      state.pingInterval = null
    }
  }

  /**
   * Disconnect
   */
  function disconnect(): void {
    if (state.reconnectTimer) {
      clearTimeout(state.reconnectTimer)
      state.reconnectTimer = null
    }

    cleanup()
    state.reconnectAttempts = maxReconnectAttempts // Prevents auto-reconnect

    if (state.ws) {
      state.ws.close()
      state.ws = null
    }

    status.value = 'disconnected'
  }

  /**
   * Send message
   */
  function send<T>(type: ClientMessage['type'], payload: T): void {
    if (state.ws?.readyState !== WebSocket.OPEN) {
      console.warn('[WebSocket] Cannot send message: not connected')
      return
    }

    const message: ClientMessage = {
      type,
      payload,
      timestamp: Date.now(),
    }

    state.ws.send(JSON.stringify(message))
  }

  /**
   * Register event handler
   */
  function on<T>(type: ServerMessageType, handler: MessageHandler<T>): () => void {
    if (!state.handlers.has(type)) {
      state.handlers.set(type, new Set())
    }

    state.handlers.get(type)!.add(handler as MessageHandler)

    // Return unsubscribe function
    return () => {
      state.handlers.get(type)?.delete(handler as MessageHandler)
    }
  }

  /**
   * One-time event handler
   */
  function once<T>(type: ServerMessageType, handler: MessageHandler<T>): void {
    const wrappedHandler: MessageHandler<T> = (payload) => {
      handler(payload)
      state.handlers.get(type)?.delete(wrappedHandler as MessageHandler)
    }

    on(type, wrappedHandler)
  }

  // Auto-connect on mount (only once globally)
  if (autoConnect && !state.isInitialized) {
    state.isInitialized = true
    onMounted(() => {
      connect()
    })

    // Note: We do NOT disconnect on unmount to preserve connection across page navigations
    // The connection is managed globally and persists until the browser tab is closed
  }

  return {
    status,
    connect,
    disconnect,
    send,
    on,
    once,
  }
}
