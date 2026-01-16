import type { Text } from "./entities";

export interface Repository {
  saveText(text: Text): Promise<void>;
  getTextById(id: string): Promise<Text | undefined>;
  getAllTexts(): Promise<Text[]>;
  deleteTextById(id: string): Promise<void>;
  purge(): Promise<void>;
}
