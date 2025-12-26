// src/lib/chunking/types.ts

export interface ChunkMetadata {
  source: string;
  chunkIndex: number;
  totalChunks: number;
  startPosition: number;
  endPosition: number;
  tokens?: number;
  [key: string]: any;
}

export interface Chunk {
  id: string;
  content: string;
  metadata: ChunkMetadata;
}

export interface ChunkingStrategy {
  chunk(text: string, metadata?: Partial<ChunkMetadata>): Chunk[];
}

export interface ChunkingConfig {
  strategy: "fixed" | "sentence" | "paragraph" | "semantic" | "recursive";
  chunkSize?: number;
  chunkOverlap?: number;
  separators?: string[];
  minChunkSize?: number;
  maxChunkSize?: number;
}
