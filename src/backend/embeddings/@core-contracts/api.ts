import type { SearchResult } from "./dtos";
import type { VectorDocument } from "./entities";
import type { EmbeddingResultDTO } from "./dtos";

export interface EmbeddingAPI {
    generateEmbeddings(texts: string[]): Promise<EmbeddingResultDTO>;
    getAllDocuments(): Promise<VectorDocument[]>;
    search(text: string, topK?: number): Promise<SearchResult[]>;
}