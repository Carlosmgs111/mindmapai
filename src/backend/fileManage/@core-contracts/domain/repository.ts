type File = {
  id: string;
  name: string;
  type: string;
  size: number;
  lastModified: number;
};
export interface IRepository {
  saveFile(file: File): Promise<void>;
  getFileById(id: string): Promise<File | undefined>;
  getFiles(): Promise<File[]>;
  deleteFile(id: string): Promise<boolean>;
}
