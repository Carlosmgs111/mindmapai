import type { PromptTemplateDTO } from "./dtos";

export interface PromptBuilder {
  buildPrompt({ systemPrompt, userPrompt }: PromptTemplateDTO): Promise<string>;
}
