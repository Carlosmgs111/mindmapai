import type { SearchResult } from "./dtos";
import type { VectorDocument } from "./entities";
import type { EmbeddingResultDTO, EmbeddingCreationDTO } from "./dtos";

export interface EmbeddingAPI {
    generateEmbeddings(texts: EmbeddingCreationDTO[]): Promise<EmbeddingResultDTO>;
    getAllDocuments(): Promise<VectorDocument[]>;
    search(text: string, topK?: number): Promise<SearchResult[]>;
}