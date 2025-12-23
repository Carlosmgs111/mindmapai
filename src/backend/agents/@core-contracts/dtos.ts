export interface PromptTemplateDTO {
    id: string;
    systemPrompt: string;
    userPrompt: string;
}

export interface AICompletionDTO {
    systemPrompt?: string;
    userPrompt: string;
}

export interface ChunkOptions {
    chunkSize: number;
    chunkOverlap: number;
}

export interface PromptTemplateDTO {
    id: string;
    template: string;
}

export interface AgentDTO {
    id: string;
    model: string;
    name: string;
    description: string;
    instructions: string;
    tools: string[];
}
