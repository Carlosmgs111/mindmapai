import type { Chunk } from "./chunking";

export interface ProcessedDocument {
    documentId: string;
    chunks: Chunk[];
    metadata: {
      originalLength: number;
      chunksCount: number;
      strategy: string;
      processingTime: number;
    };
  }