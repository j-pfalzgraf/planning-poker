# 1 Punto de Historia – Cambios Muy Pequeños

> **Esfuerzo:** 1–2 horas
> **Riesgo:** Bajo
> **Pruebas:** Prueba de humo recomendada
> **Complejidad:** Mínima

---

## 📋 Ejemplo 1: Reemplazar Icono

### Historia de Usuario

> Como **Usuario** quiero **ver un icono de guardar moderno**, para que **la interfaz se vea más contemporánea**.

### Contexto

El botón "Guardar" actualmente usa un icono de disquete (`floppy-disk`). Como los disquetes ya no son comunes, debe reemplazarse con un icono de marca de verificación.

### Detalles Técnicos

```text
Archivo afectado: app/components/SaveButton.vue
Librería de iconos: @heroicons/vue
Icono anterior: FloppyDiskIcon
Icono nuevo: CheckIcon
```

### Criterios de Aceptación

- [ ] Reemplazar icono en `SaveButton.vue` de `FloppyDiskIcon` a `CheckIcon`
- [ ] Actualizar importación del icono
- [ ] El tamaño permanece en `w-5 h-5`
- [ ] Verificación visual en escritorio y móvil
- [ ] Sin cambios funcionales

### Definición de Hecho

- [ ] Revisión de código completada
- [ ] Probado en staging
- [ ] Capturas de pantalla documentadas en el ticket

---

## 📋 Ejemplo 2: Agregar Tooltip

### Historia de Usuario

> Como **Cliente** quiero **entender si el precio incluye IVA**, para que **no tenga sorpresas al pagar**.

### Contexto

El icono de información (`ℹ`) junto al campo de precio debe mostrar un tooltip con el texto "Incluye IVA" al pasar el cursor. El componente tooltip ya existe en el proyecto.

### Detalles Técnicos

```vue
<template>
  <Tooltip text="Incluye IVA">
    <InfoIcon class="w-4 h-4 text-gray-400 cursor-help" />
  </Tooltip>
</template>
```

### Criterios de Aceptación

- [ ] Usar componente tooltip de `@/components/ui/Tooltip.vue`
- [ ] Texto: "Incluye IVA"
- [ ] Tooltip aparece al hover y focus (accesibilidad)
- [ ] Retraso: 200ms antes de mostrarse
- [ ] Posición: centro superior

---

## 📋 Ejemplo 3: Ajuste CSS según Guía de Estilo

### Historia de Usuario

> Como **Brand Manager** quiero **ajustar el color del botón a la nueva guía de estilo**, para que **todos los productos se vean uniformes**.

### Contexto

El botón primario usa `#0066cc`, según la nueva guía de estilo debe ser `#0052a3`.

### Detalles Técnicos

| Propiedad | Anterior  | Nuevo     |
| --------- | --------- | --------- |
| Fondo     | `#0066cc` | `#0052a3` |
| Hover     | `#0055b3` | `#003d7a` |

**Archivo:** `tailwind.config.ts`

```typescript
primary: {
  500: '#0052a3', // era: #0066cc
  600: '#003d7a', // era: #0055b3
}
```
