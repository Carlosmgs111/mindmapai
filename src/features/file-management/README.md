# File Management Feature

## Descripción

Esta característica maneja la gestión de archivos PDF en la aplicación, permitiendo subir, listar, visualizar y eliminar archivos. Soporta dos modos de ejecución: servidor y navegador.

## Arquitectura

### Componentes React

#### `FileList.tsx`
Componente principal que maneja la lista de archivos con carga dinámica de la API según el entorno de ejecución.

**Props:**
- `execEnv`: `"browser" | "server"` - Define qué API usar

**Características:**
- Carga dinámica de `filesApiFactory` cuando `execEnv === "browser"`
- Maneja el estado de carga, error y datos
- Actualiza automáticamente el store de nanostores
- Soporte para operaciones CRUD de archivos
- **Integra `LibraryFileSelector`** para el modo de selección de archivos

**Importación dinámica (modo browser):**
```typescript
const { filesApiFactory } = await import("@/modules/files/index");
const api = await filesApiFactory({
  storage: "browser",      // Usa File System Access API
  repository: "browser",   // Usa IndexedDB
});
```

#### `FileItem.tsx`
Componente que representa un archivo individual en la lista.

**Props:**
- `file`: Objeto FileData con información del archivo
- `onDelete`: Callback para eliminar archivo
- `onDetail`: Callback para ver detalles
- `timeAgo`: Instancia de TimeAgo para formatear fechas

**Características:**
- UI interactiva con estados de carga
- Botones de acción (detalle, editar, eliminar)
- Confirmación antes de eliminar
- **Soporte para modo selección**: cuando `selectionMode` está activo, permite seleccionar archivos
- Integración con nanostores para selección reactiva
- Deshabilita botones de acción en modo selección

#### `LibraryFileSelector.tsx`
Componente que controla el modo de selección de archivos.

**Características:**
- Switch para activar/desactivar modo selección
- Botón "Continuar" que navega al generador con el archivo seleccionado
- Se vuelve `sticky` cuando el modo selección está activo
- Integración completa con nanostores (`selectionMode` y `fileStore`)
- Deshabilita el botón "Continuar" cuando no hay archivo seleccionado

#### `Switch.tsx` (Shared)
Componente reutilizable de switch/toggle.

**Props:**
- `id`: Identificador único
- `label`: Texto del label (opcional)
- `name`: Nombre del input hidden (opcional)
- `disabled`: Estado deshabilitado (opcional)

**Características:**
- Integrado con `selectionMode` store
- Animaciones suaves de transición
- Estados visuales claros (on/off)

### Página Astro

#### `files.astro`
Página principal que integra los componentes React.

**Variables de entorno:**
- `EXEC_ENV`: Define el modo de ejecución (`"browser"` o `"server"`)

**Directivas de hidratación:**
- `client:load`: El componente FileList se hidrata inmediatamente en el cliente

### Tipos

#### `types/index.ts`
Definiciones de tipos TypeScript compartidos:

```typescript
export interface FileData {
  id: string;
  name: string;
  size: number;
  lastModified: number;
  type: string;
  url: string;
}

export type ExecEnvironment = "browser" | "server";
```

## Modos de Ejecución

### Modo Servidor (`EXEC_ENV !== "browser"`)
- Usa endpoints `/api/file` del servidor
- Almacenamiento en sistema de archivos local o Cloudinary
- Repositorio CSV o base de datos del servidor

### Modo Navegador (`EXEC_ENV === "browser"`)
- Usa `filesApiFactory` con configuración browser
- **Storage**: File System Access API (BrowserStorage)
  - Requiere permisos del usuario para acceder al directorio
  - Escribe archivos directamente en el sistema de archivos local
- **Repository**: IndexedDB (BrowserRepository)
  - Almacena metadatos de archivos en el navegador
  - No requiere conexión al servidor

## Flujo de Datos

```
┌─────────────────────────────────────────────────┐
│              files.astro (EXEC_ENV)             │
└─────────────────────┬───────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────┐
│              FileList (React)                   │
│  ┌──────────────────────────────────────────┐   │
│  │      LibraryFileSelector                 │   │
│  │  ┌────────┐    ┌──────────────┐         │   │
│  │  │ Switch │───▶│ selectionMode│         │   │
│  │  └────────┘    │   (store)    │         │   │
│  │                └──────┬───────┘         │   │
│  │                       │                  │   │
│  └───────────────────────┼──────────────────┘   │
│                          ▼                       │
│  ┌──────────────────────────────────────────┐   │
│  │         FileItem (x N archivos)          │   │
│  │  • Selección cuando mode=true            │   │
│  │  • Acciones cuando mode=false            │   │
│  │  • Reactivo a fileStore                  │   │
│  └──────────────────────────────────────────┘   │
└─────────────────┬───────────────────────────────┘
                  │
    ┌─────────────┴─────────────┐
    │                           │
    ▼ browser                   ▼ server
┌──────────────────────┐    ┌──────────────────┐
│ filesApiFactory      │    │   /api/file      │
│ + BrowserStorage     │    │   (Servidor)     │
│ + BrowserRepository  │    │                  │
└──────────────────────┘    └──────────────────┘
```

## Stores (Nanostores)

### `fileStore`
Store global para gestionar el estado de archivos.

```typescript
export const fileStore = atom<IndexFile>({
  indexes: [],          // IDs de archivos
  stagedIndexes: [],    // IDs seleccionados
  files: {},            // Mapa de archivos por ID
});
```

**Funciones:**
- `setFiles(files)`: Añade archivos al store
- `setStagedFiles(indexes)`: Marca archivos como seleccionados

## Dependencias

- `react`: Componentes interactivos
- `javascript-time-ago`: Formateo de fechas relativas
- `nanostores`: Gestión de estado global
- `@/modules/files`: Módulo backend con clean architecture

## APIs del Backend

### Configuración Browser
```typescript
{
  storage: "browser",      // BrowserStorage
  repository: "browser"    // BrowserRepository
}
```

### Configuración Servidor
```typescript
{
  storage: "local-fs",     // LocalFsStorage
  repository: "csv"        // LocalCsvRepository
}
```

## Permisos del Navegador

Cuando `EXEC_ENV === "browser"`, se requieren:

1. **File System Access API**
   - El usuario debe seleccionar un directorio
   - Se solicita mediante `window.showDirectoryPicker()`
   - Los archivos se guardan en ese directorio

2. **IndexedDB**
   - Disponible automáticamente
   - No requiere permisos explícitos

## Mejoras Futuras

- [ ] Soporte para edición de nombres de archivo
- [ ] Modal de detalles de archivo mejorado
- [ ] Búsqueda y filtrado de archivos
- [ ] Paginación para listas grandes
- [ ] Drag & drop para subir archivos
- [ ] Preview de archivos PDF
- [ ] Soporte para múltiples tipos de archivo
