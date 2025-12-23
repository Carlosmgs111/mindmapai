import type { AgentDTO, PromptTemplateDTO } from "./dtos";

export interface PromptRepository {
    getPromptById(id: string): Promise<string>;
    savePromptById(id: string, prompt: PromptTemplateDTO): Promise<void>;
}
    
export interface AgentRepository {
    getAgentById(id: string): Promise<AgentDTO>;
    saveAgentById(id: string, agent: AgentDTO): Promise<void>;
}