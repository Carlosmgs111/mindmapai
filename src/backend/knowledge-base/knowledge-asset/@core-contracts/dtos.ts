import type { FileUploadDTO } from "@/modules/files/@core-contracts/dtos";
import type { ChunkingStrategyType } from "@/backend/knowledge-base/chunking/@core-contracts/entities";

export interface NewKnowledgeDTO {
  id: string;
  name: string;
  sources: [FileUploadDTO | string];
  chunkingStrategy: ChunkingStrategyType;
  embeddingStrategy: string;
  cleanedTextIds: string[];
  embeddingsIds: string[];
  metadata: Record<string, any>;
}

export interface KnowledgeAssetDTO {
  id: string;
  sourcesIds: string[];
  cleanedTextIds: string[];
  embeddingsIds: string[];
}
