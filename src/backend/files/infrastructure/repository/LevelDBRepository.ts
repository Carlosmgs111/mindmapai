import type { Repository } from "../../@core-contracts/repositories";
import type { File } from "../../@core-contracts/entities";
import { getDB } from "@/modules/shared/config/repositories";

export class LevelDBRepository implements Repository {
  private db: any;
  private dbInitialized: boolean = false;

  constructor() {
    console.log("LevelDBRepository constructor (files module)");
  }

  private async ensureDB() {
    if (!this.dbInitialized) {
      this.db = await getDB("files");
      this.dbInitialized = true;
    }
  }

  async saveFile(file: File): Promise<void> {
    try {
      await this.ensureDB();
      await this.db.put(file.id, JSON.stringify(file));
      console.log(`File ${file.id} saved successfully`);
    } catch (error) {
      console.error("Error saving file:", error);
      throw error;
    }
  }

  async getFileById(id: string): Promise<File | undefined> {
    try {
      await this.ensureDB();
      const fileData = await this.db.get(id);

      // Check if data is valid before parsing
      if (fileData === undefined || fileData === null || fileData === "undefined") {
        return undefined;
      }

      return JSON.parse(fileData);
    } catch (error: any) {
      // Level throws an error when key is not found
      if (error?.notFound || error?.code === 'LEVEL_NOT_FOUND') {
        return undefined;
      }
      console.error("Error getting file by id:", error);
      throw error;
    }
  }

  async getAllFiles(): Promise<File[]> {
    console.log(`Getting all files`);
    try {
      await this.ensureDB();
      const files: File[] = [];

      for await (const [key, value] of this.db.iterator()) {
        console.log({ key, value });
        files.push(JSON.parse(value));
      }

      return files;
    } catch (error) {
      console.error("Error getting files:", error);
      return [];
    }
  }

  async deleteFile(id: string): Promise<boolean> {
    try {
      await this.ensureDB();

      // Check if file exists before deleting
      try {
        await this.db.get(id);
      } catch (error: any) {
        if (error?.notFound || error?.code === 'LEVEL_NOT_FOUND') {
          // File doesn't exist, consider it already deleted
          console.log(`File ${id} deleted successfully`);
          return true;
        }
        throw error;
      }

      await this.db.del(id);
      console.log(`File ${id} deleted successfully`);
      return true;
    } catch (error) {
      console.error("Error deleting file:", error);
      return false;
    }
  }

  async purge(): Promise<void> {
    try {
      await this.ensureDB();
      await this.db.clear();
      console.log("Files database purged successfully!");
    } catch (error) {
      console.error("Error purging database:", error);
      throw error;
    }
  }
}
