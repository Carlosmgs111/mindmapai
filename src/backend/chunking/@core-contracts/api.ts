import type { ChunkingConfig } from "./chunking";
import type { ChunkMetadata } from "./chunking";
import type { ProcessedDocument } from "./dtos";

export interface ChunkingApi {
  chunkOne(
    text: string,
    config: ChunkingConfig,
    documentMetadata?: Partial<ChunkMetadata>
  ): Promise<ProcessedDocument>;
  chunkMultiple(
    documents: Array<{ text: string; metadata?: Partial<ChunkMetadata> }>,
    config: ChunkingConfig
  ): Promise<ProcessedDocument[]>;
}
