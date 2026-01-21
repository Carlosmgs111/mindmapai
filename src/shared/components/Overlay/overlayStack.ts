// overlayStack.ts
import { atom } from "nanostores";

const BASE_Z_INDEX = 1000;

export const overlayStack = atom<number[]>([]);

export function acquireOverlay(): number {
  const nextZ = BASE_Z_INDEX + overlayStack.get().length + 1;
  overlayStack.set([...overlayStack.get(), nextZ]);
  return nextZ;
}

export function releaseOverlay(zIndex: number) {
  overlayStack.set(
    overlayStack.get().filter((z) => z !== zIndex)
  );
}

export function isTopOverlay(zIndex: number): boolean {
  const stack = overlayStack.get();
  return stack[stack.length - 1] === zIndex;
}
