import type { IStorage } from "../../@core-contracts/domain/storage";
import fs from "fs";

export class LocalStorage implements IStorage {
  constructor() {
    if (!fs.existsSync("./uploads")) {
      fs.mkdirSync("./uploads");
    }
  }

  async uploadFile(file: Buffer, fileName: string): Promise<string> {
    const filePath = `./uploads/${fileName}`;
    fs.writeFile(filePath, file, () => {});
    return filePath;
  }
  async deleteFile(fileName: string): Promise<void> {
    fs.unlink(`./uploads/${fileName}`, () => {});
  }
}
