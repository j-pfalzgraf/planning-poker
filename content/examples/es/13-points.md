# 13 Puntos de Historia – Cambios Grandes

> **Esfuerzo:** 3–5 días
> **Riesgo:** Alto
> **Pruebas:** Cobertura de pruebas completa requerida
> **Complejidad:** Alta

---

## 📋 Ejemplo 1: Asistente de Onboarding Multi-Paso

### Épica

> Como **cliente nuevo** quiero **ser guiado a través de un proceso de configuración** para poder **usar el sistema productivamente lo más rápido posible**.

### Contexto

Los clientes nuevos actualmente tienen que encontrar todas las configuraciones manualmente. Un asistente de 4 pasos debe guiarlos a través de los pasos más importantes y reducir el tiempo hasta el valor.

### Flujo del Asistente

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Paso 1    │───▶│   Paso 2    │───▶│   Paso 3    │───▶│   Paso 4    │
│  Empresa    │    │  Contacto   │    │   Pago      │    │  Resumen    │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
      │                  │                  │                  │
      ▼                  ▼                  ▼                  ▼
   Validación        Validación        Validación         Enviar
   guardar           guardar           guardar            todos datos
```

### Detalles de Pasos

| Paso                | Campos                    | Validación                 |
| ------------------- | ------------------------- | -------------------------- |
| 1. Datos Empresa    | Nombre, Dirección, RFC    | Requerido, formato RFC     |
| 2. Persona Contacto | Nombre, Email, Teléfono   | Formato email, Requerido   |
| 3. Método de Pago   | Transferencia o Tarjeta   | Verificación número cuenta |
| 4. Resumen          | Todos los datos (lectura) | Confirmación               |

### Componentes Técnicos

```typescript
// Gestión de estado
interface OnboardingState {
  currentStep: 1 | 2 | 3 | 4;
  company: CompanyData | null;
  contact: ContactData | null;
  payment: PaymentData | null;
  isDirty: boolean;
  errors: Record<string, string[]>;
}

// Almacenamiento intermedio
const STORAGE_KEY = 'onboarding_draft';
localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
```

### Criterios de Aceptación

- [ ] Indicador de progreso muestra paso actual (1/4, 2/4, ...)
- [ ] Validación por paso al hacer clic en Siguiente
- [ ] Navegación hacia atrás sin pérdida de datos
- [ ] Auto-guardado en LocalStorage cada 30s y en blur
- [ ] Advertencia al salir de la página con datos sin guardar
- [ ] Resumen final con enlaces de edición a cada paso
- [ ] Manejo de errores en submit (lógica de reintento)
- [ ] Optimizado para móvil (stepper vertical)
- [ ] Navegación por teclado (Tab, Enter)

### Escenarios de Prueba

1. **Camino Feliz:** Llenar todos los pasos → Completado exitosamente
2. **Error de Validación:** Número de cuenta inválido → Mostrar error
3. **Abandono:** Cerrar pestaña en paso 2 → Restaurar datos al reabrir
4. **Error de Red:** Submit falla → Mostrar botón de reintento

---

## 📋 Ejemplo 2: Dashboard Personalizable con Widgets

### Historia de Usuario

> Como **usuario avanzado** quiero **personalizar mi dashboard con widgets** para poder **ver la información importante para mí de un vistazo**.

### Alcance de Funcionalidad

- **Biblioteca de Widgets:** 8 widgets predefinidos
- **Drag & Drop:** Posicionamiento libre
- **Redimensionar:** Cambiar tamaño mediante manija
- **Persistencia:** El diseño se guarda

### Widgets Disponibles

| Widget            | Tamaños       | Fuente de Datos          |
| ----------------- | ------------- | ------------------------ |
| Gráfico Ingresos  | 1x1, 2x1, 2x2 | `/api/stats/revenue`     |
| Pedidos Recientes | 1x2, 2x2      | `/api/orders?limit=10`   |
| Lista de Tareas   | 1x1, 1x2      | `/api/tasks?status=open` |
| Tiles KPI         | 1x1, 2x1      | `/api/stats/kpis`        |
| Calendario        | 2x2           | `/api/events`            |
| Actividad Equipo  | 1x2           | `/api/activity`          |
| Acciones Rápidas  | 1x1           | estático                 |
| Notas             | 1x1, 1x2      | `/api/notes`             |

### Sistema de Cuadrícula

```
┌──────────┬──────────┬──────────┬──────────┐
│  Widget  │  Widget  │       Widget        │
│   1x1    │   1x1    │        2x1          │
├──────────┼──────────┼──────────┬──────────┤
│       Widget        │  Widget  │  Widget  │
│        2x1          │   1x1    │   1x1    │
├──────────┬──────────┼──────────┴──────────┤
│  Widget  │  Widget  │       Widget        │
│   1x2    │   1x2    │        2x2          │
│          │          │                     │
└──────────┴──────────┴─────────────────────┘
```

### Criterios de Aceptación

- [ ] Biblioteca de widgets con tarjetas de vista previa
- [ ] Drag & drop para posicionamiento (react-grid-layout o vue-grid-layout)
- [ ] Redimensionar mediante manijas de esquina
- [ ] Detección de colisiones (widgets no se superponen)
- [ ] Diseño guardado en DB (con debounce, 500ms después del cambio)
- [ ] Restablecer diseño predeterminado (botón + confirmación)
- [ ] Responsivo: Cuadrícula se adapta al viewport
- [ ] Skeleton de carga para cada widget

---

## 📋 Ejemplo 3: Centro de Notificaciones In-App

### Historia de Usuario

> Como **usuario** quiero **ver todas las notificaciones relevantes en un solo lugar** para **no perderme nada importante**.

### Arquitectura de Componentes

```
┌─────────────────────────────────────────────────┐
│                    Header                        │
│  Logo   Nav   Nav   Nav   [🔔 3]   Avatar       │
└─────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────────┐
                    │  Dropdown           │
                    │  Notificaciones     │
                    │  ┌───────────────┐  │
                    │  │ Nuevo Pedido  │  │
                    │  │ hace 2 min    │  │
                    │  ├───────────────┤  │
                    │  │ Tarea Lista   │  │
                    │  │ hace 1 hora   │  │
                    │  └───────────────┘  │
                    │  [Marcar todo leído]│
                    │  [Ver todas →]      │
                    └─────────────────────┘
```

### Modelo de Datos

```typescript
interface Notification {
  id: string;
  type: 'order' | 'task' | 'system' | 'mention';
  title: string;
  message: string;
  link?: string;
  isRead: boolean;
  createdAt: Date;
  expiresAt?: Date;
}
```

### Criterios de Aceptación

- [ ] Icono de campana con badge (contador no leídos, máx 99+)
- [ ] Dropdown con últimas 10 notificaciones
- [ ] Marcar como leído (individual o todas)
- [ ] Clic en notificación → navegar a página relevante
- [ ] Actualizaciones en tiempo real vía WebSocket
- [ ] Persistencia en base de datos
- [ ] Sonido en nueva notificación (opcional, configurable)
- [ ] Página "Todas las notificaciones" con paginación y filtrado

---

## ✅ ¿Por qué 13 Puntos?

| Criterio     | Evaluación                         |
| ------------ | ---------------------------------- |
| Arquitectura | Múltiples sistemas integrados      |
| Estado       | Gestión de estado compleja         |
| Componentes  | 10+ archivos nuevos/modificados    |
| Persistencia | Base de datos + endpoints de API   |
| Pruebas      | Alto esfuerzo de pruebas           |
| Riesgo       | Casos límite y escenarios de error |
