# 0 Puntos de Historia – Cambios Triviales

> **Esfuerzo:** Mínimo, generalmente menos de 15 minutos
> **Riesgo:** Casi ninguno
> **Pruebas:** Normalmente no se requieren
> **Complejidad:** Ninguna

---

## 📋 Ejemplo 1: Activar Feature Flag

### Historia de Usuario

> Como **Product Owner** quiero **activar la función de Modo Oscuro**, para que **nuestros usuarios puedan comenzar a usarla inmediatamente**.

### Contexto

La función de Modo Oscuro está completamente implementada y probada, pero fue retenida para el último release. Ahora debe activarse cambiando un feature flag.

### Implementación

```json
// config/features.json
{
  "darkMode": true,  // ← Cambio: false → true
  "betaFeatures": false,
  "newCheckout": true
}
```

### Criterios de Aceptación

- [ ] Establecer feature flag en `config/features.json` a `true`
- [ ] Crear y fusionar PR
- [ ] Activar despliegue
- [ ] Probar Modo Oscuro en producción

### Evaluación de Riesgo

| Aspecto          | Calificación          |
| ---------------- | --------------------- |
| Cambio de código | 1 línea               |
| Pruebas          | Prueba de humo        |
| Rollback         | Resetear feature flag |

---

## 📋 Ejemplo 2: Ajustar Variable de Entorno

### Historia de Usuario

> Como **Ingeniero DevOps** quiero **aumentar el timeout de la API**, para que **las solicitudes API lentas ya no fallen**.

### Contexto

Algunas llamadas API a un servicio externo lento están expirando. El timeout actual de 5 segundos debe aumentarse a 10 segundos.

### Cambio

```bash
# .env.production
API_TIMEOUT=10000  # era: 5000
```

### Criterios de Aceptación

- [ ] Establecer `API_TIMEOUT=10000` en `.env.production`
- [ ] No se requieren cambios de código
- [ ] Redesplegar para activar
- [ ] Monitorear errores de timeout

---

## 📋 Ejemplo 3: Corregir Error Tipográfico

### Historia de Usuario

> Como **Usuario** quiero **ver texto correcto en la app**, para que **el producto luzca profesional**.

### Problema

El pie de página del sitio muestra **"Contcato"** en lugar de **"Contacto"**.

### Solución

```vue
<!-- app/components/Footer.vue -->
<template>
  <footer>
    <a href="/contact">Contacto</a>  <!-- era: Contcato -->
  </footer>
</template>
```

### Criterios de Aceptación

- [ ] Corregir error tipográfico en `Footer.vue`
- [ ] Verificar el mismo error en otros lugares
- [ ] Verificar visualmente en el navegador
