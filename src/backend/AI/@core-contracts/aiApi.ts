import type { AICompletionDTO } from "./dtos";

export interface AIApi {
    streamCompletion(command: AICompletionDTO): AsyncGenerator<string>;
}