import type { FileUploadDTO } from "@/modules/files/@core-contracts/dtos";
import type { ChunkingStrategyType } from "@/modules/knowledge-base/chunking/@core-contracts/entities";

export interface GenerateNewKnowledgeDTO {
    sources: FileUploadDTO[];
    chunkingStrategy: ChunkingStrategyType;
    embeddingStrategy: string;
}