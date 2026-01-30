# 2 Puntos de Historia – Cambios Pequeños

> **Esfuerzo:** Medio día
> **Riesgo:** Bajo a moderado
> **Pruebas:** Pruebas unitarias recomendadas

---

## Ejemplo 1: Nuevo Campo de Formulario

**Título:** Campo de Número de Teléfono Opcional en Formulario de Contacto

**Descripción:**
Se debe agregar un campo de entrada opcional para número de teléfono al formulario de contacto. Validación de formato para números estadounidenses/internacionales.

**Criterios de Aceptación:**

- [ ] Nuevo campo `phone` en el formulario
- [ ] Etiqueta: "Teléfono (opcional)"
- [ ] Validación: Solo se permiten números, +, -, espacios
- [ ] El campo se envía al backend

---

## Ejemplo 2: Agregar Opción de Ordenamiento

**Título:** Ordenar Lista de Productos por Precio

**Descripción:**
Se debe agregar una opción de ordenamiento "Precio ascendente/descendente" a la vista general de productos.

**Criterios de Aceptación:**

- [ ] Menú desplegable con opciones de ordenamiento
- [ ] Ordenamiento del lado del cliente
- [ ] Ordenamiento activo resaltado visualmente

---

## Ejemplo 3: Diálogo de Confirmación

**Título:** Mostrar Diálogo de Confirmación al Eliminar

**Descripción:**
Antes de eliminar una entrada, debe aparecer un modal: "¿Estás seguro de que deseas eliminar?"

**Criterios de Aceptación:**

- [ ] Modal con "Sí" / "Cancelar"
- [ ] Eliminación solo con confirmación
- [ ] El modal se puede cerrar con ESC

---

## ¿Por qué 2 Puntos?

- Múltiples componentes afectados
- Lógica simple
- Esfuerzo de pruebas manejable
- Bajo riesgo de efectos secundarios
