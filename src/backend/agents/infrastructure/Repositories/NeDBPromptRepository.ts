import Datastore from "nedb-promises";
import type { PromptRepository } from "../../@core-contracts/repositories";
import type { PromptTemplateDTO } from "../../@core-contracts/dtos";
import path from "path";

export class NeDBPromptRepository implements PromptRepository {
  private db: Datastore<any>;

  constructor(dbPath?: string) {
    this.db = Datastore.create({
      filename: dbPath || path.join(process.cwd(), "database", "nedb", "prompts.db"),
      autoload: true,
    });
    this.db.ensureIndex({ fieldName: "id", unique: true });
  }

  async getPromptById(id: string): Promise<string> {
    const prompt = await this.db.findOne({ id });
    if (!prompt) throw new Error(`Prompt with id ${id} not found`);
    return prompt.template || prompt.systemPrompt || "";
  }

  async savePromptById(id: string, prompt: PromptTemplateDTO): Promise<void> {
    const promptToSave = { ...prompt, id };
    const existing = await this.db.findOne({ id });
    if (existing) {
      await this.db.update({ id }, promptToSave);
    } else {
      await this.db.insert(promptToSave);
    }
  }
}
