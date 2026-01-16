import Datastore from "nedb-promises";
import type { Repository } from "../../@core-contracts/repositories";
import type { Text } from "../../@core-contracts/entities";
import path from "path";

export class NeDBRepository implements Repository {
  private db: Datastore<any>;

  constructor(dbPath?: string) {
    this.db = Datastore.create({
      filename: dbPath || path.join(process.cwd(), "database", "nedb", "texts.db"),
      autoload: true,
    });
    this.db.ensureIndex({ fieldName: "id", unique: true });
    this.db.ensureIndex({ fieldName: "sourceId" });
  }

  async saveText(text: Text): Promise<void> {
    const existing = await this.db.findOne({ id: text.id });
    if (existing) {
      await this.db.update({ id: text.id }, text);
    } else {
      await this.db.insert(text);
    }
  }

  async getTextById(id: string): Promise<Text | undefined> {
    const text = await this.db.findOne({ id });
    if (!text) return undefined;
    const { _id, ...textData } = text;
    return textData as Text;
  }

  async getAllTexts(): Promise<Text[]> {
    const texts = await this.db.find({});
    return texts.map(({ _id, ...textData }: any) => textData as Text);
  }

  async deleteTextById(id: string): Promise<void> {
    await this.db.remove({ id }, {});
  }

  async purge(): Promise<void> {
    await this.db.remove({}, { multi: true });
  }
}
