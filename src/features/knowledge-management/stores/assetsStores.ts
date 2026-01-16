import type { KnowledgeAsset } from "@/backend/knowledge-base/knowledge-asset";
import { atom } from "nanostores";

export const assetsStore = atom<KnowledgeAsset[]>([]);

export const removeAsset = (id: string) => {
  assetsStore.set(assetsStore.get().filter((asset) => asset.id !== id));
};
