# Spec: Migración Frontend React — BusProject

**Fecha:** 2026-04-30  
**Estado:** Aprobado

## Objetivo
Reemplazar los 4 templates Thymeleaf con componentes React equivalentes, manteniendo el mismo diseño visual y todas las funcionalidades (tablas paginadas, modales, formularios, llamadas a la API).

## Páginas a implementar

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/login` | `LoginPage` | Formulario email/password, fondo degradado púrpura |
| `/dashboard` | `DashboardPage` | Stats de buses + acceso rápido |
| `/buses` | `BusesPage` | Tabla paginada + modal detalle + modal agregar bus + modal agregar marca |
| `/viajes` | `ViajesPage` | Tabla paginada + modal detalle + modal crear viaje |

## Estructura de archivos

```
frontend/src/
  components/
    Layout.jsx            ← wrapper: sidebar fijo + área main
    Sidebar.jsx           ← nav con secciones, ítem activo según ruta
    Topbar.jsx            ← barra superior con título y avatar
    BusTable.jsx          ← existente, integrar en BusesPage
    BusModal.jsx          ← existente, integrar en BusesPage
    AddBusModal.jsx       ← formulario: número, placa, características, marca, activo
    AddMarcaModal.jsx     ← formulario: nombre de marca
    ViajeTable.jsx        ← tabla paginada de viajes
    ViajeDetailModal.jsx  ← detalle de viaje
    CreateViajeModal.jsx  ← formulario: origen, destino, fechas, bus
  pages/
    LoginPage.jsx
    DashboardPage.jsx
    BusesPage.jsx
    ViajesPage.jsx
  App.jsx                 ← BrowserRouter con rutas
  main.jsx                ← sin cambios
```

## Dependencias
- Instalar `react-router-dom` en `frontend/`

## Diseño visual (fiel a los templates)
- Colores: `#1a1a2e`, `#16213e`, `#0f3460` (sidebar), `#667eea` / `#764ba2` (accent)
- Fondo general: `#f0f2f5`
- Inline styles (consistente con código existente)
- Sidebar fijo: 260px de ancho, `margin-left: 260px` en main
- Badge activo: verde `#d1fae5/#065f46`, inactivo: rojo `#fee2e2/#991b1b`

## API endpoints usados
- `GET /bus?page=&size=10` — lista paginada
- `GET /bus/:id` — detalle bus
- `POST /bus` — crear bus
- `GET /bus/marcas` — lista marcas
- `POST /bus/marcas` — crear marca
- `GET /bus/all` — todos los buses (para select en viaje)
- `GET /viaje?page=&size=10` — lista paginada
- `GET /viaje/:id` — detalle viaje
- `POST /viaje` — crear viaje

## Navegación
- `<Link>` de react-router-dom en Sidebar
- `useNavigate` para redirigir post-login (por ahora navega a `/dashboard` sin validar credenciales — auth real se implementa en etapa posterior)
- Ítem activo en Sidebar: `useLocation().pathname`

## Fuera de alcance
- Autenticación real (JWT/sesión) — queda para etapa posterior
- Página de Configuración — placeholder sin funcionalidad
