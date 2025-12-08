import { atom } from "nanostores";

export type IndexFile = {
  indexes: number[];
  files: {
    [id: string]: File | null;
  };
};

export const fileStore = atom<IndexFile>({ indexes: [], files: {} });
