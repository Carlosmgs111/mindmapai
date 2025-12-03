import type { IStorage } from "../@core-contracts/domain/storage";

export class FileManagerUseCases {
    constructor(
        private storage: IStorage
    ) {}

    uploadFile(file: Buffer, fileName: string) {
        return this.storage.uploadFile(file, fileName);
    }

    deleteFile(fileUrl: string) {
        return this.storage.deleteFile(fileUrl);
    }
}
    