import type { PromptRepository } from "../../@core-contracts/repositories";
import type { PromptTemplateDTO } from "../../@core-contracts/dtos";
import { getPromptsDB } from "../../../shared/config/repositories";
import { Level } from "level";

export class LocalLevelPromptRepository implements PromptRepository {
    private db: Level;
    constructor() {
        this.db = getPromptsDB();
    }
    
    getPromptById(id: string): Promise<string> {
        return this.db.get(id);
    }
    
    savePromptById(id: string, prompt: PromptTemplateDTO): Promise<void> {
        return this.db.put(id, JSON.stringify(prompt));
    }
}