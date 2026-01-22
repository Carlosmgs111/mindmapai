# Overlay Component

Componente de overlay con animaciones suaves, gestión automática de z-index y soporte para múltiples overlays apilados.

## Versiones Disponibles

- **Overlay.astro**: Versión nativa de Astro (recomendado para mejor performance)
- **index.tsx**: Versión React (legacy)

## Uso en Astro

```astro
---
import Overlay from '@/shared/components/Overlay/Overlay.astro';
---

<Overlay open={true}>
  <div class="bg-white p-6 h-full">
    <h2>Contenido del Overlay</h2>
    <p>Este contenido se desliza desde la derecha</p>
  </div>
</Overlay>

<script>
  // Escuchar evento de cierre
  document.querySelector('overlay-component')?.addEventListener('overlay-close', () => {
    console.log('Overlay cerrado');
    // Actualizar estado o realizar acciones
  });
</script>
```

## Uso con Estado Reactivo (Nanostores)
```astro
---
import Overlay from '@/shared/components/Overlay/Overlay.astro';
---

<button id="open-overlay">Abrir Overlay</button>

<Overlay open={false} id="my-overlay">
  <div class="bg-white p-6 h-full w-96">
    <h2>Mi Overlay</h2>
    <button id="close-overlay">Cerrar</button>
  </div>
</Overlay>

<script>
  const overlay = document.getElementById('my-overlay') as HTMLElement;
  const openBtn = document.getElementById('open-overlay');
  const closeBtn = document.getElementById('close-overlay');

  openBtn?.addEventListener('click', () => {
    overlay?.setAttribute('data-open', 'true');
  });

  closeBtn?.addEventListener('click', () => {
    overlay?.setAttribute('data-open', 'false');
  });

  // Escuchar cierre automático (Escape o click fuera)
  overlay?.addEventListener('overlay-close', () => {
    overlay.setAttribute('data-open', 'false');
  });
</script>
```

## Características

- ✅ Animaciones suaves de entrada/salida (300ms)
- ✅ Gestión automática de z-index para múltiples overlays
- ✅ Cierre con tecla Escape (solo el overlay superior)
- ✅ Cierre al hacer click fuera del contenido
- ✅ Soporte para múltiples overlays apilados
- ✅ Backdrop con blur y transparencia

## Props

| Prop | Tipo | Default | Descripción |
|------|------|---------|-------------|
| `open` | `boolean` | `false` | Controla si el overlay está visible |
| `class` | `string` | `undefined` | Clases CSS adicionales |

## Eventos

| Evento | Descripción |
|--------|-------------|
| `overlay-close` | Se dispara cuando el overlay se cierra (Escape o click fuera) |

## Detalles Técnicos

- El componente utiliza Web Components (`customElements`) para manejar el ciclo de vida
- La gestión de z-index se maneja mediante `overlayStack.ts` (compartido con la versión React)
- Las animaciones son puramente CSS (Tailwind)
- El contenido se desliza desde la derecha con `translate-x-full`

## Migración desde React

Si estás migrando desde la versión React:

**Antes (React):**
```tsx
const [open, setOpen] = useState(false);

<Overlay open={open} setOpen={setOpen}>
  <div>Contenido</div>
</Overlay>
```

**Después (Astro):**
```html
<Overlay open={false} id="my-overlay">
  <div>Contenido</div>
</Overlay>

<script>
  const overlay = document.getElementById('my-overlay');

  // Abrir
  overlay?.setAttribute('data-open', 'true');

  // Cerrar
  overlay?.setAttribute('data-open', 'false');

  // Escuchar cierre
  overlay?.addEventListener('overlay-close', () => {
    overlay.setAttribute('data-open', 'false');
  });
</script>
```
