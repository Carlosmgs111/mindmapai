import type { ChunkingConfig } from "./dtos";
import type { ChunkMetadata, ChunkBatch } from "./entities";
import type { ChunkingResultDTO } from "./dtos";

export interface ChunkingApi {
  chunkOne(
    text: string,
    config: ChunkingConfig,
    documentMetadata?: Partial<ChunkMetadata>
  ): Promise<ChunkingResultDTO>;
  chunkMultiple(
    documents: Array<{ text: string; metadata?: Partial<ChunkMetadata> }>,
    config: ChunkingConfig
  ): Promise<ChunkingResultDTO[]>;
}
