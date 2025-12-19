# 🏗️ Migración Frontend - MindMapAI

## 📋 Descripción

Este paquete contiene la nueva arquitectura frontend por capas y capacidades para el proyecto MindMapAI, junto con herramientas de migración automatizada.

## 📦 Contenido del Paquete

```
mindmap-migration/
├── src/                          # Nueva estructura de código
│   ├── features/                 # Features autocontenidos
│   │   ├── mindmap-editor/
│   │   ├── file-management/
│   │   └── mindmap-generator/
│   └── shared/                   # Código compartido
│       ├── components/
│       ├── stores/
│       └── utils/
├── MIGRATION_GUIDE.md            # Guía completa de migración
├── ARCHITECTURE_DIAGRAM.md       # Diagramas visuales
├── migrate.sh                    # Script de migración automatizado
└── README.md                     # Este archivo
```

## 🚀 Inicio Rápido

### Opción 1: Migración Automatizada (Recomendada)

```bash
# 1. Copia el script a tu proyecto
cp migrate.sh /ruta/a/tu/proyecto/

# 2. Ve a tu proyecto
cd /ruta/a/tu/proyecto/

# 3. Ejecuta el script
./migrate.sh

# 4. Revisa los cambios
git status

# 5. Actualiza los imports según MIGRATION_NOTES.md
```

### Opción 2: Migración Manual

```bash
# 1. Copia la estructura src/
cp -r src/features /ruta/a/tu/proyecto/src/
cp -r src/shared /ruta/a/tu/proyecto/src/

# 2. Actualiza tsconfig.json manualmente

# 3. Sigue la checklist en MIGRATION_GUIDE.md
```

## 📖 Documentación

### 1. Guía de Migración Completa
**Archivo**: `MIGRATION_GUIDE.md`

Incluye:
- ✅ Estructura de directorios detallada
- ✅ Reglas de importación
- ✅ Checklist paso a paso
- ✅ Ejemplos prácticos
- ✅ Path aliases

### 2. Diagramas de Arquitectura
**Archivo**: `ARCHITECTURE_DIAGRAM.md`

Incluye:
- 📊 Diagrama de dependencias
- 📊 Flujo de información
- 📊 Comparación antes/después
- 📊 Estructura de features

## 🎯 Principios de la Nueva Arquitectura

### 1. Features Autocontenidos
Cada feature agrupa su lógica relacionada:
```
features/mindmap-editor/
├── components/      # Componentes del feature
├── lib/            # Lógica de negocio
├── stores/         # Estado del feature
└── types/          # Tipos TypeScript
```

### 2. Shared para Reutilización
Solo código verdaderamente compartido:
```
shared/
├── components/
│   ├── ui/         # Button, Switch, Card
│   └── layout/     # Sidebar, Header
├── stores/         # auth, theme
└── utils/          # sc, shuffleArray
```

### 3. Dependencias Unidireccionales
```
pages → features → shared
```

## ⚙️ Configuración

### Path Aliases (tsconfig.json)

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/features/*": ["src/features/*"],
      "@/shared/*": ["src/shared/*"],
      "@/layouts/*": ["src/layouts/*"]
    }
  }
}
```

### Ejemplo de Imports

```typescript
// ✅ Correcto
import { sc } from '@/shared/utils/sc';
import Switch from '@/shared/components/ui/Switch.astro';
import { currentMindmap } from '@/features/mindmap-editor/stores/currentMindmap';

// ❌ Evitar (rutas relativas largas)
import { sc } from '../../../shared/utils/sc';
```

## 🔄 Flujo de Migración

### Fase 1: Preparación (15 min)
1. ✅ Hacer backup del proyecto
2. ✅ Leer MIGRATION_GUIDE.md
3. ✅ Ejecutar script de migración

### Fase 2: Actualización (30-60 min)
1. ✅ Actualizar imports en pages/
2. ✅ Actualizar imports en layouts/
3. ✅ Actualizar imports dentro de features

### Fase 3: Verificación (15 min)
1. ✅ `npm run build` sin errores
2. ✅ Probar funcionalidad de cada página
3. ✅ Verificar hot reload en desarrollo

### Fase 4: Limpieza (10 min)
1. ✅ Eliminar carpetas antiguas
2. ✅ Actualizar documentación del proyecto
3. ✅ Commit de cambios

**Tiempo total estimado**: 1.5 - 2 horas

## 📝 Checklist de Verificación

### Pre-migración
- [ ] Backup del proyecto creado
- [ ] Git commit de trabajo actual
- [ ] MIGRATION_GUIDE.md leído

### Post-migración
- [ ] Estructura de directorios creada
- [ ] tsconfig.json actualizado
- [ ] Imports actualizados en pages/
- [ ] Imports actualizados en layouts/
- [ ] `npm run build` exitoso
- [ ] Todas las páginas funcionan
- [ ] Hot reload funciona
- [ ] Carpetas antiguas eliminadas
- [ ] Documentación actualizada

## 🆘 Troubleshooting

### Error: "Cannot find module '@/shared/...'"

**Solución**: Verifica que tsconfig.json tenga los path aliases correctos y reinicia el servidor de desarrollo.

```bash
# Reiniciar servidor
npm run dev
```

### Error: Imports circulares

**Problema**: Feature A importa de Feature B que importa de Feature A.

**Solución**: Mueve el código compartido a `shared/` o refactoriza para eliminar la dependencia circular.

### Componente no renderiza después de migración

**Solución**: Verifica que todos los imports estén actualizados y que el componente esté en la ubicación correcta.

## 💡 Tips y Mejores Prácticas

### 1. Naming Conventions
```typescript
// Stores: verbos + noun
export const fileStore = atom<FileIndex>({...});
export const currentMindmap = atom<string | null>(null);

// Acciones: verbos imperativos
export const setFiles = (files: Record<string, any>) => {...};
export const removeFile = (fileId: string) => {...};

// Componentes: PascalCase descriptivo
MarkmapViewer.astro
MindmapTextEditor.astro
FileUploader.astro
```

### 2. Organización de Features
```
feature/
├── components/      # Solo componentes del feature
├── lib/            # Lógica de negocio, helpers
├── stores/         # Estado específico del feature
└── types/          # Tipos TypeScript del feature
```

### 3. Cuándo crear un nuevo feature
- ✅ Tiene 3+ componentes relacionados
- ✅ Tiene su propio estado (store)
- ✅ Representa una capacidad de negocio clara
- ❌ Solo 1-2 componentes → considerar shared/

### 4. Cuándo usar shared/
- ✅ Componente usado en 2+ features
- ✅ Utilidad pura sin dependencias
- ✅ Tipos compartidos entre features
- ❌ Código específico de un feature → mantener en feature/

## 🔗 Referencias

- [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) - Guía completa
- [ARCHITECTURE_DIAGRAM.md](./ARCHITECTURE_DIAGRAM.md) - Diagramas
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [Feature-Sliced Design](https://feature-sliced.design/)

## 📞 Soporte

Si encuentras problemas durante la migración:

1. Revisa la sección de Troubleshooting
2. Consulta MIGRATION_GUIDE.md
3. Revisa los ejemplos prácticos en la guía
4. Documenta el problema para futuras referencias

## 🎉 Beneficios Post-Migración

Después de completar la migración, disfrutarás de:

- ✨ **Desarrollo más rápido**: Estructura clara y predecible
- ✨ **Menos bugs**: Separación de responsabilidades
- ✨ **Onboarding facilitado**: Código autodocumentado
- ✨ **Testing más fácil**: Features aisladas
- ✨ **Escalabilidad**: Añadir features sin conflictos

---

**¡Buena suerte con tu migración!** 🚀

*Creado con nano-precisión por el nano-arquitecto Carlos*