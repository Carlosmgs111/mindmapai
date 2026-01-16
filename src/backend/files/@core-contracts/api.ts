import type { FileUploadDTO } from "./dtos";
import type { File } from "./entities";
import type { FileUploadResultDTO } from "./dtos";

export interface FilesApi {
  uploadFile({file}: {file: FileUploadDTO}): Promise<FileUploadResultDTO>;
  getFileById(id: string): Promise<File & { buffer: Buffer }>;
  getAllFiles(): Promise<File[]>;
  deleteFile(id: string): Promise<void>;
}
