# ? Puntos de Historia – Esfuerzo Desconocido

> **Esfuerzo:** No se puede estimar
> **Riesgo:** Desconocido
> **Acción:** Se requiere Spike/Investigación

---

## ¿Cuándo se Usa "?"

La carta "?" señala que una historia **no puede estimarse** porque:

- Los requisitos no están claros
- La viabilidad técnica es incierta
- Existen demasiadas incógnitas
- Se necesita más contexto

---

## Ejemplo 1: Requisitos Poco Claros

**Título:** Importación de Datos desde Sistema Legado

**Descripción:**
Se deben importar datos del sistema antiguo.

**¿Por qué "?":**

- ¿En qué formato están los datos?
- ¿Cuántos registros?
- ¿Qué campos se mapean?
- ¿Hay reglas de validación?

**Siguiente Paso:**
Reunión con stakeholder para aclarar requisitos.

---

## Ejemplo 2: Incertidumbre Técnica

**Título:** Integración con API de Terceros

**Descripción:**
Conectar con la API del proveedor XY.

**¿Por qué "?":**

- Documentación de API no revisada
- Método de autenticación no claro
- Límites de tasa desconocidos
- Falta acceso al sandbox

**Siguiente Paso:**
Spike: Revisar documentación de API, probar sandbox.

---

## Ejemplo 3: Pregunta de Viabilidad

**Título:** Optimización de Rendimiento de Búsqueda

**Descripción:**
La búsqueda debe ser más rápida.

**¿Por qué "?":**

- Rendimiento actual no medido
- Objetivo no definido (¿qué tan rápido?)
- Causa raíz del problema desconocida

**Siguiente Paso:**
Realizar análisis de rendimiento, recopilar métricas.

---

## Enfoque Recomendado

1. **Diferir la historia** – No agregar al sprint
2. **Planificar un spike** – Investigación con tiempo limitado (ej. 4h, 1 día)
3. **Documentar hallazgos** – Registrar insights
4. **Re-estimar la historia** – Estimar nuevamente con nuevo conocimiento
5. **Posiblemente dividir** – Separar en historias más pequeñas y estimables

---

## ⚠️ Nota

"?" **no es una estimación válida** para el sprint.
Es una señal para el equipo de que **se necesita trabajo previo**.
