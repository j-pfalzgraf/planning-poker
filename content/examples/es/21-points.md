# 21 Puntos de Historia – Cambios Muy Grandes

> **Esfuerzo:** 1–2 semanas
> **Riesgo:** Alto
> **Pruebas:** Suite de pruebas completa + revisión QA

---

## Ejemplo 1: Permisos Basados en Roles

**Título:** Implementar Sistema de Roles y Permisos

**Descripción:**
Introducción de roles (Admin, Manager, Usuario) con permisos granulares. Los elementos de UI y endpoints de API están protegidos correspondientemente.

**Criterios de Aceptación:**

- [ ] Roles: Admin, Manager, Usuario, Invitado
- [ ] Permisos por funcionalidad (CRUD)
- [ ] UI de administración para gestión de roles
- [ ] Frontend: Visualización condicional de elementos
- [ ] Backend: Middleware para autorización
- [ ] Log de auditoría para cambios de permisos
- [ ] Migración de usuarios existentes

---

## Ejemplo 2: Multi-Tenancy

**Título:** Introducir Soporte Multi-Inquilino

**Descripción:**
La aplicación debe soportar múltiples inquilinos (empresas) independientes. Separación estricta de datos.

**Criterios de Aceptación:**

- [ ] ID de inquilino en todas las tablas relevantes
- [ ] Detección de inquilino por subdominio o header
- [ ] Selector de inquilino para super admins
- [ ] Datos aislados por inquilino
- [ ] Configuración específica por inquilino
- [ ] Migración de datos existentes

---

## Ejemplo 3: Internacionalización (i18n)

**Título:** Soporte Multi-Idioma Completo (EN, ES, PT)

**Descripción:**
Toda la aplicación debe estar disponible en tres idiomas. Cambio dinámico de idioma sin recarga.

**Criterios de Aceptación:**

- [ ] Todos los textos de UI externalizados
- [ ] Archivos de idioma para EN, ES, PT
- [ ] Selector de idioma en header
- [ ] Idioma guardable en configuración de usuario
- [ ] Formatos de fecha y número localizados
- [ ] Soporte RTL preparado

---

## ¿Por qué 21 Puntos?

- Cambios amplios en todo el sistema
- Impacto en arquitectura
- Alto riesgo de regresiones
- Migración compleja
- Pruebas intensivas requeridas
