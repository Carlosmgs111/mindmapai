import { atom } from "nanostores";

export const queryStore = atom<{ query: string; style: string }>({
  query: "",
  style: "default",
});
