import type { FileUploadDTO } from "@/modules/files/@core-contracts/dtos";

export interface GenerateNewKnowledgeDTO {
  source: FileUploadDTO | string;
  chunkingStrategy: string;
  embeddingStrategy: string;
}

export interface KnowledgeAssetDTO {
  id: string;
  sourceId: string;
  cleanedTextId: string;
  chunkingStrategy: string;
  embeddingStrategy: string;
}
