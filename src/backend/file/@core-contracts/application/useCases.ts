export interface IFileManagerUseCases {
    uploadFile(file: Buffer, fileName: string): Promise<string>;
    deleteFile(fileUrl: string): Promise<void>;
}