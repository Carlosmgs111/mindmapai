/**
 * Overlay Component - React Version
 *
 * Este es el componente React original del Overlay.
 * Para la versión Astro, importa desde './Overlay.astro'
 *
 * @deprecated Considera usar la versión Astro para mejor performance
 */

import { createPortal } from "react-dom";
import { useOverlay } from "./useOverlay";
import { sc } from "@/shared/utils/sc";

export const Overlay = ({
  children,
  open,
  setOpen,
}: {
  children?: React.ReactNode;
  open: boolean;
  setOpen: (open: boolean) => void;
}) => {

  const { mounted, visible, zIndexRef } = useOverlay({ open, setOpen });

  if (!mounted || typeof window === "undefined") return null;

  return createPortal(
    <div
      style={{ zIndex: zIndexRef.current! }}
      onClick={(e) => {
        if (e.target !== e.currentTarget) return;
        setOpen(false);
      }}
      className={sc(
        "fixed inset-0 bg-slate-800/30 backdrop-blur-xs flex justify-end transition-opacity duration-300",
        visible
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      )}
    >
      <div
        className={sc(
          "h-full w-fit transition-transform duration-300 ease-in-out",
          visible ? "translate-x-0" : "translate-x-full"
        )}
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

