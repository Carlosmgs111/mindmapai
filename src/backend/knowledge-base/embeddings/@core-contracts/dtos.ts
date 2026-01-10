import type { VectorDocument } from "./entities";

export interface SearchResult {
  document: VectorDocument;
  similarity: number;
}

export interface VectorDBConfig {
  dbPath: string;
  dimensions: number;
  similarityThreshold?: number;
}

export interface EmbeddingResultDTO {
  documents?: VectorDocument[];
  status: "success" | "error";
  message?: string;
}

export interface EmbeddingCreationDTO {
  id: string;
  content: string;
  metadata: {
    sourceId: string;
  };
}
