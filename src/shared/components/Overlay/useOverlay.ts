import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  acquireOverlay,
  releaseOverlay,
  isTopOverlay,
} from "./overlayStack";
import { sc } from "@/shared/utils/sc";

const ANIMATION_MS = 300;

export const useOverlay = ({open, setOpen, }: {open: boolean, setOpen: (open: boolean) => void}) => {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const zIndexRef = useRef<number | null>(null);

  useEffect(() => {
    if (open) {
      setMounted(true);
    } else {
      setVisible(false);
      const t = setTimeout(() => setMounted(false), ANIMATION_MS);
      return () => clearTimeout(t);
    }
  }, [open]);

  useLayoutEffect(() => {
    if (mounted) {
      setVisible(false);
      requestAnimationFrame(() => {
        setVisible(true);
      });
    }
  }, [mounted]);

  if (open && zIndexRef.current === null) {
    zIndexRef.current = acquireOverlay();
  }

  useEffect(() => {
    if (!mounted && zIndexRef.current !== null) {
      releaseOverlay(zIndexRef.current);
      zIndexRef.current = null;
    }
  }, [mounted]);

  useEffect(() => {
    if (!visible || zIndexRef.current === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isTopOverlay(zIndexRef.current!)) {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [visible, setOpen]);

  return {
    mounted,
    visible,
    zIndexRef,
  };
};
