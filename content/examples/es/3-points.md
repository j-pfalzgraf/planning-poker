# 3 Puntos de Historia – Cambios Pequeños a Medianos

> **Esfuerzo:** 0.5–1 día
> **Riesgo:** Moderado
> **Pruebas:** Pruebas unitarias y de integración recomendadas

---

## Ejemplo 1: Lista Filtrable

**Título:** Filtrar Lista de Tareas por Estado

**Descripción:**
La lista de tareas debe ser filtrable por estado (Abierta, En Progreso, Completada). Botones de filtro encima de la lista.

**Criterios de Aceptación:**

- [ ] Botones de filtro para cada estado
- [ ] Opción "Todas"
- [ ] Parámetro URL para filtro (`?status=open`)
- [ ] Mostrar estado vacío cuando hay 0 resultados

---

## Ejemplo 2: Formulario con Validación

**Título:** Formulario de Registro con Validación en Tiempo Real

**Descripción:**
Campos: Email, Contraseña, Confirmación de contraseña. Validación en blur y submit.

**Criterios de Aceptación:**

- [ ] Validar formato de email
- [ ] Contraseña mínimo 8 caracteres
- [ ] Las contraseñas deben coincidir
- [ ] Mostrar errores en línea

---

## Ejemplo 3: Ordenamiento Simple con Drag & Drop

**Título:** Reordenar Tareas mediante Drag & Drop

**Descripción:**
Las tareas en una lista deben poder reordenarse mediante drag & drop. El nuevo orden se guarda.

**Criterios de Aceptación:**

- [ ] Manija de arrastre en cada tarea
- [ ] Vista previa visual durante el arrastre
- [ ] Guardar después de soltar
- [ ] Soporte táctil

---

## ¿Por qué 3 Puntos?

- Múltiples estados a gestionar
- Cambios de UI y lógica
- Complejidad moderada
- Posibles casos límite
