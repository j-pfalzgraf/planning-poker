# 5 Puntos de Historia – Cambios Medianos

> **Esfuerzo:** 1–2 días
> **Riesgo:** Moderado
> **Pruebas:** Pruebas unitarias, de integración y E2E recomendadas
> **Complejidad:** Media

---

## 📋 Ejemplo 1: Exportación CSV para Pedidos

### Historia de Usuario

> Como **administrador de tienda** quiero **exportar todos los pedidos mostrados como CSV** para poder **procesar los datos en Excel**.

### Contexto

La vista general de pedidos actualmente muestra hasta 100 pedidos. Un nuevo botón de exportación debe descargarlos como archivo CSV. Los filtros activos deben respetarse.

### Arquitectura Técnica

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   ExportButton  │────▶│   OrderService  │────▶│   CSV-Generator │
│   (Frontend)    │     │   (Llamada API) │     │   (Backend)     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │                                               │
         │◀──────────────── Descarga Blob ◀──────────────┘
```

### Especificación de API

```http
GET /api/orders/export?status=pending&from=2024-01-01
Accept: text/csv

Respuesta:
Content-Type: text/csv; charset=utf-8
Content-Disposition: attachment; filename="pedidos-2024-01-15.csv"
```

### Formato CSV

```csv
NoPedido;Fecha;Cliente;Artículos;Total
ORD-2024-001;15/01/2024;Juan Pérez;3;$149.99
ORD-2024-002;15/01/2024;María García;1;$29.99
```

### Criterios de Aceptación

- [ ] Botón "Exportar como CSV" en la esquina superior derecha de la vista de pedidos
- [ ] Columnas: No. Pedido, Fecha, Cliente, Número de Artículos, Total
- [ ] Formato latinoamericano (Fecha: DD/MM/YYYY, Números: 1.234,56)
- [ ] UTF-8 con BOM para compatibilidad con Excel
- [ ] Nombre de archivo: `pedidos-YYYY-MM-DD.csv`
- [ ] Spinner de carga durante la generación
- [ ] Manejo de errores para > 10,000 filas

### Escenarios de Prueba

1. **Camino Feliz:** Exportar 50 pedidos → CSV correcto
2. **Exportación Vacía:** Sin pedidos → Mostrar mensaje informativo
3. **Datos Grandes:** 5,000 pedidos → Rendimiento < 3s
4. **Caracteres Especiales:** Nombres de clientes con acentos → correcto en Excel

---

## 📋 Ejemplo 2: Paginación del Lado del Servidor

### Historia de Usuario

> Como **usuario** quiero **navegar por listas grandes** para que **la página cargue rápido y se mantenga organizada**.

### Contexto

La lista de productos actualmente carga los más de 5,000 artículos de una vez, causando tiempos de carga largos. Se debe implementar paginación del lado del servidor con 20 artículos por página.

### Cambios de API

```typescript
// Nuevo endpoint
GET /api/articles?page=1&limit=20&sort=name:asc

// Respuesta
{
  "data": [...],
  "meta": {
    "total": 5432,
    "page": 1,
    "limit": 20,
    "totalPages": 272
  }
}
```

### Componente UI

```
┌────────────────────────────────────────────────┐
│  ◀ Atrás   1  2  3  ...  271  272   Siguiente ▶│
│           Mostrando 1-20 de 5,432 artículos    │
└────────────────────────────────────────────────┘
```

### Criterios de Aceptación

- [ ] Backend: Endpoint con parámetros `page`, `limit`, `sort`
- [ ] Frontend: Componente de paginación con números de página
- [ ] Sincronización URL: `?page=2` se refleja en URL
- [ ] Deep Link: Acceso directo a página 5 funciona
- [ ] Estado de carga durante cambio de página (skeleton)
- [ ] Saltar a página 1 al cambiar filtro
- [ ] Móvil: Paginación simplificada (solo Anterior/Siguiente)

---

## 📋 Ejemplo 3: Carga de Foto de Perfil

### Historia de Usuario

> Como **usuario registrado** quiero **subir una foto de perfil** para que **mi perfil se vea más personal**.

### Criterios de Aceptación

- [ ] Drag & drop o selección de archivo
- [ ] Formatos permitidos: JPG, PNG, WebP
- [ ] Tamaño máximo: 5 MB
- [ ] Vista previa antes de subir (opción de recorte)
- [ ] Indicador de progreso durante la carga
- [ ] Servidor: Redimensionar a máx 400x400px
- [ ] La imagen anterior se elimina automáticamente
- [ ] Fallback: Avatar con iniciales cuando no hay imagen

### Manejo de Errores

| Error            | Mensaje                              |
| ---------------- | ------------------------------------ |
| Formato inválido | "Solo se permiten JPG, PNG o WebP"   |
| Muy grande       | "La imagen debe ser de 5 MB o menos" |
| Carga fallida    | "La carga falló. Intenta de nuevo."  |

---

## ✅ ¿Por qué 5 Puntos?

| Criterio     | Evaluación                      |
| ------------ | ------------------------------- |
| Arquitectura | Frontend + Backend              |
| Componentes  | 3–5 archivos nuevos/modificados |
| Lógica       | Complejidad moderada            |
| Pruebas      | Unitarias + Integración         |
| Riesgo       | Manejable                       |
