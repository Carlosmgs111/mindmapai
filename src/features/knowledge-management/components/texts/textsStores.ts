import type { TextIndexDTO } from "@/backend/knowledge-base/text-extraction/@core-contracts/dtos";
import { atom } from "nanostores";

export const textsStore = atom<TextIndexDTO[]>([]);

export const removeText = (id: string) => {
  textsStore.set(textsStore.get().filter((text) => text.id !== id));
};
