import { atom } from "nanostores";

export type IndexFile = {
  indexes: string[];
  files: {
    [id: string]: File | null;
  };
};

export const fileStore = atom<IndexFile>({ indexes: [], files: {} });
