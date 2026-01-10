import type { EmbeddingProvider } from "../@core-contracts/providers";
import type { VectorRepository } from "../@core-contracts/repositories";
import type { SearchResult } from "../@core-contracts/dtos";
import type { VectorDocument } from "../@core-contracts/entities";
import type { EmbeddingResultDTO, EmbeddingCreationDTO } from "../@core-contracts/dtos";

export class EmbeddingUseCases {
  constructor(
    private embeddingProvider: EmbeddingProvider,
    private vectorRepository: VectorRepository
  ) {}

  async generateEmbeddings(texts: EmbeddingCreationDTO[]): Promise<EmbeddingResultDTO> {
    const embeddings = await this.embeddingProvider.generateEmbeddings(texts.map((text) => text.content));
    const documents: VectorDocument[] = texts.map((text, index) => ({
      id: crypto.randomUUID(),
      content: text.content,
      embedding: embeddings[index],
      metadata: {
        sourceId: text.metadata.sourceId,
      },
      timestamp: Date.now(),
    }));
    await this.vectorRepository.addDocuments(documents);
    return {
      documents,
      status: "success",
    };
  }
  async search(text: string, topK: number): Promise<SearchResult[]> {
    const queryEmbedding = await this.embeddingProvider.generateEmbedding(text);
    return this.vectorRepository.search(queryEmbedding, topK);
  }
  async getAllDocuments(): Promise<VectorDocument[]> {
    return this.vectorRepository.getAllDocuments();
  }
}
