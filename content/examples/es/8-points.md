# 8 Puntos de Historia – Cambios Grandes

> **Esfuerzo:** 2–3 días
> **Riesgo:** Medio a alto
> **Pruebas:** Suite de pruebas completa requerida
> **Complejidad:** Media-Alta

---

## 📋 Ejemplo 1: Notificaciones por Email

### Historia de Usuario

> Como **usuario nuevo** quiero **recibir un email de confirmación** para poder **verificar mi dirección de email y activar mi cuenta**.

### Contexto

Después del registro, el usuario debe confirmar su dirección de email antes de poder usar completamente la aplicación. Esto aumenta la seguridad y reduce los registros spam.

### Arquitectura Técnica

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Frontend  │────▶│   Backend   │────▶│   Servicio  │
│   Registro  │     │   API       │     │   Email     │
└─────────────┘     └──────┬──────┘     └──────┬──────┘
                           │                    │
                           ▼                    ▼
                    ┌─────────────┐     ┌─────────────┐
                    │  Base de    │     │   SMTP/SES  │
                    │  Datos      │     │             │
                    │  (Token)    │     │             │
                    └─────────────┘     └─────────────┘
```

### Plantilla de Email

```html
<!-- templates/email/confirm-registration.html -->
<h1>¡Bienvenido a {{appName}}!</h1>
<p>Haz clic en el botón para confirmar tu email:</p>
<a href="{{confirmUrl}}" class="button">Confirmar Email</a>
<p><small>El enlace es válido por 24 horas.</small></p>
```

### Endpoints de API

| Endpoint                        | Método | Descripción                    |
| ------------------------------- | ------ | ------------------------------ |
| `/api/auth/register`            | POST   | Crear usuario + enviar email   |
| `/api/auth/confirm/{token}`     | GET    | Validar token + activar cuenta |
| `/api/auth/resend-confirmation` | POST   | Reenviar email                 |

### Criterios de Aceptación

- [ ] Crear plantilla de email (HTML + fallback texto plano)
- [ ] Enlace de activación basado en token con cadena aleatoria de 64 caracteres
- [ ] Almacenar token en Redis/DB con TTL de 24 horas
- [ ] Página de error para token inválido o expirado
- [ ] Botón de reenvío en página de login (solo si no está activado)
- [ ] Rate limiting: Máximo 3 reenvíos por hora
- [ ] Registro de emails para depuración

### Aspectos de Seguridad

- [ ] El token es criptográficamente seguro
- [ ] El token se invalida después de usarse
- [ ] Protección contra fuerza bruta en endpoint de confirmación

---

## 📋 Ejemplo 2: Búsqueda de Texto Completo con Resaltado

### Historia de Usuario

> Como **usuario** quiero **buscar artículos y ver coincidencias resaltadas** para poder **encontrar información relevante rápidamente**.

### Solución Técnica

```typescript
// Búsqueda con resaltado
const searchArticles = async (query: string) => {
  const response = await fetch(`/api/articles/search?q=${encodeURIComponent(query)}`);
  return response.json();
};

// Formato de respuesta
interface SearchResult {
  id: string;
  title: string;
  titleHighlighted: string;  // Con etiquetas <mark>...</mark>
  excerpt: string;
  excerptHighlighted: string;
  score: number;
}
```

### Criterios de Aceptación

- [ ] Campo de búsqueda con debounce (300ms entre entradas)
- [ ] Búsqueda en título y descripción
- [ ] Resaltado de términos de búsqueda con etiquetas `<mark>`
- [ ] Mínimo 2 caracteres requeridos para búsqueda
- [ ] Mostrar estado vacío cuando hay 0 resultados
- [ ] Botón "Cargar más" para > 20 resultados
- [ ] Rendimiento: < 200ms para 10,000+ artículos (índice requerido)

---

## 📋 Ejemplo 3: Sistema de Comentarios

### Historia de Usuario

> Como **lector del blog** quiero **escribir comentarios y responder a otros** para poder **participar en la discusión**.

### Modelo de Datos

```typescript
interface Comment {
  id: string;
  postId: string;
  parentId: string | null;  // null = comentario de nivel superior
  authorId: string;
  authorName: string;
  content: string;          // máx 1000 caracteres
  createdAt: Date;
  updatedAt: Date | null;
  isDeleted: boolean;
}
```

### Estructura de UI

```
┌─────────────────────────────────────────────────┐
│ 💬 3 Comentarios                                 │
├─────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────┐ │
│ │ 👤 Juan Pérez · hace 2 horas               │ │
│ │ "¡Gran artículo! Gracias por los consejos."│ │
│ │ [Responder] [Editar] [Eliminar]            │ │
│ │                                             │ │
│ │   ┌─────────────────────────────────────┐   │ │
│ │   │ 👤 María G. · hace 1 hora          │   │ │
│ │   │ "¡De acuerdo, muy útil!"           │   │ │
│ │   │ [Responder]                         │   │ │
│ │   └─────────────────────────────────────┘   │ │
│ └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### Criterios de Aceptación

- [ ] Escribir comentario (máx 1000 caracteres, contador de caracteres)
- [ ] Respuestas anidadas (1 nivel de profundidad)
- [ ] Editar comentarios propios (con insignia "editado")
- [ ] Eliminar comentarios propios (eliminación suave, muestra "[eliminado]")
- [ ] Marcas de tiempo relativas ("hace 5 minutos", "ayer")
- [ ] Avatar + nombre del autor
- [ ] Actualizaciones en tiempo real opcionales (WebSocket para comentarios en vivo)

---

## ✅ ¿Por qué 8 Puntos?

| Criterio     | Evaluación                              |
| ------------ | --------------------------------------- |
| Arquitectura | Múltiples sistemas integrados           |
| Complejidad  | Frontend + Backend + servicios externos |
| Seguridad    | Aspectos de seguridad a considerar      |
| Pruebas      | Suite de pruebas completa necesaria     |
| Riesgo       | Riesgo aumentado por dependencias       |
