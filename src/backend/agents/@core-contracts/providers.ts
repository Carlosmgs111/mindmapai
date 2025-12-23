import type { AgentDTO } from "./dtos";
import type { AICompletionDTO } from "./dtos";

export interface AIProvider {
    generateCompletion(command: AICompletionDTO): Promise<string>;
    streamCompletion(command: AICompletionDTO): AsyncGenerator<string>;
    setAgent(agent: AgentDTO): Promise<void>;
}