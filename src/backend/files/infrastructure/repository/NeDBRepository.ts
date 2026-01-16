import Datastore from "nedb-promises";
import type { Repository } from "../../@core-contracts/repositories";
import type { File } from "../../@core-contracts/entities";
import path from "path";

export class NeDBRepository implements Repository {
  private db: Datastore<any>;

  constructor(dbPath?: string) {
    this.db = Datastore.create({
      filename: dbPath || path.join(process.cwd(), "database", "nedb", "files.db"),
      autoload: true,
    });
    this.db.ensureIndex({ fieldName: "id", unique: true });
    this.db.ensureIndex({ fieldName: "type" });
  }

  async saveFile(file: File): Promise<void> {
    const existing = await this.db.findOne({ id: file.id });
    if (existing) {
      await this.db.update({ id: file.id }, file);
    } else {
      await this.db.insert(file);
    }
  }

  async getFileById(id: string): Promise<File | undefined> {
    const file = await this.db.findOne({ id });
    if (!file) return undefined;
    const { _id, ...fileData } = file;
    return fileData as File;
  }

  async getAllFiles(): Promise<File[]> {
    const files = await this.db.find({});
    return files.map(({ _id, ...fileData }: any) => fileData as File);
  }

  async deleteFile(id: string): Promise<boolean> {
    const numRemoved = await this.db.remove({ id }, {});
    return numRemoved > 0;
  }

  async purge(): Promise<void> {
    await this.db.remove({}, { multi: true });
  }
}
