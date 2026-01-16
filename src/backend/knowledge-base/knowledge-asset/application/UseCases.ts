import type { KnowledgeAssetApi } from "../@core-contracts/api";
import type {
  FullKnowledgeAssetDTO,
  KnowledgeAssetDTO,
  NewKnowledgeDTO,
} from "../@core-contracts/dtos";
import type { KnowledgeAssetsRepository } from "../@core-contracts/repositories";
import type { KnowledgeAsset } from "../@core-contracts/entities";
import type { EmbeddingAPI } from "@/modules/knowledge-base/embeddings/@core-contracts/api";
import type { ChunkingApi } from "@/modules/knowledge-base/chunking/@core-contracts/api";
import type { TextExtractorApi } from "@/modules/knowledge-base/text-extraction/@core-contracts/api";
import type { FilesApi } from "@/modules/files/@core-contracts/api";
import type { FileUploadDTO } from "@/modules/files/@core-contracts/dtos";
import type { Chunk } from "@/modules/knowledge-base/chunking/@core-contracts/entities";
import type { VectorDocument } from "@/modules/knowledge-base/embeddings/@core-contracts/entities";
import type { FlowState } from "../@core-contracts/dtos";

export class KnowledgeAssetUseCases implements KnowledgeAssetApi {
  private repository: KnowledgeAssetsRepository;
  private embeddingApi: EmbeddingAPI;
  private chunkingApi: ChunkingApi;
  private textExtractorApi: TextExtractorApi;
  private filesApi: FilesApi;
  constructor(
    repository: KnowledgeAssetsRepository,
    embeddingApi: EmbeddingAPI,
    chunkingApi: ChunkingApi,
    textExtractorApi: TextExtractorApi,
    filesApi: FilesApi
  ) {
    this.repository = repository;
    this.embeddingApi = embeddingApi;
    this.chunkingApi = chunkingApi;
    this.textExtractorApi = textExtractorApi;
    this.filesApi = filesApi;
  }

  async generateKnowledgeAsset(
    command: NewKnowledgeDTO
  ): Promise<KnowledgeAsset> {
    // Create a new knowledge asset

    try {
      const knowledgeAssetId = crypto.randomUUID();
      const { sources, chunkingStrategy } = command;
      const sourceFile = sources[0] as FileUploadDTO;

      const { status, message } = await this.filesApi.uploadFile({
        file: sourceFile,
      });
      console.log(status, message);
      if (status === "ERROR") {
        throw new Error(message);
      }

      const textId = crypto.randomUUID();
      const text = await this.textExtractorApi.extractTextFromPDF({
        id: textId,
        source: sourceFile,
      });
      if (text.status === "error") {
        throw new Error(text.message);
      }

      const chunks = await this.chunkingApi.chunkOne(text.content as string, {
        strategy: chunkingStrategy,
      });
      const chunkBatch = chunks.chunks as Chunk[];
      const chunksContent = chunkBatch?.map((chunk) => ({
        id: crypto.randomUUID(),
        content: chunk.content,
        metadata: { sourceId: sourceFile.id },
      }));

      const embeddingsCollectionId = `embeddings-${knowledgeAssetId}`;
      const embeddings = await this.embeddingApi.generateEmbeddings({
        texts: chunksContent,
        collectionId: embeddingsCollectionId,
      });

      const knowledgeAsset: KnowledgeAsset = {
        name: command.name,
        id: knowledgeAssetId,
        filesIds: [sourceFile.id],
        textsIds: [textId],
        embeddingsCollectionsIds: [embeddingsCollectionId],
        metadata: command.metadata,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await this.repository.saveKnowledgeAsset(knowledgeAsset);
      return knowledgeAsset;
    } catch (error) {
      throw error;
    }
  }

  async *generateKnowledgeAssetStreamingState(
    command: NewKnowledgeDTO
  ): AsyncGenerator<KnowledgeAssetDTO | FlowState> {
    try {
      const knowledgeAssetId = crypto.randomUUID();
      const { sources, chunkingStrategy, name } = command;
      const sourceFile = sources[0] as FileUploadDTO;
      console.log({ sourceFile });

      const { status, message } = await this.filesApi.uploadFile({
        file: sourceFile,
      });
      console.log({ status, message });
      if (status === "ERROR") {
        throw new Error(message);
      }
      yield {
        status: "SUCCESS",
        step: "file-upload",
        message: "File uploaded successfully",
      };

      const textId = crypto.randomUUID();
      const text = await this.textExtractorApi.extractTextFromPDF({
        id: textId,
        source: sourceFile,
      });
      console.log({ text });
      if (text.status === "error") {
        throw new Error(text.message);
      }
      yield {
        status: "SUCCESS",
        step: "text-extraction",
        message: "Text extracted successfully",
      };

      const chunks = await this.chunkingApi.chunkOne(text.content as string, {
        strategy: chunkingStrategy,
      });
      console.log({ chunks });
      if (chunks.status === "success") {
        yield {
          status: "SUCCESS",
          step: "chunking",
          message: "Chunks generated successfully",
        };
      }

      const chunkBatch = chunks.chunks as Chunk[];
      const chunksContent = chunkBatch.map((chunk) => ({
        id: crypto.randomUUID(),
        content: chunk.content,
        metadata: { sourceId: sourceFile.id },
        timestamp: Date.now(),
      }));

      const embeddingsCollectionId = `embeddings-${knowledgeAssetId}`;
      const embeddings = await this.embeddingApi.generateEmbeddings({
        texts: chunksContent,
        collectionId: embeddingsCollectionId,
      });
      console.log({ embeddings });
      if (embeddings.status === "success") {
        yield {
          status: "SUCCESS",
          step: "embedding",
          message: "Embeddings generated successfully",
        };
      }

      const newKnowledgeAsset: KnowledgeAsset = {
        name: name,
        id: knowledgeAssetId,
        filesIds: [sourceFile.id],
        textsIds: [textId],
        embeddingsCollectionsIds: [embeddingsCollectionId],
        metadata: {},
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      this.repository.saveKnowledgeAsset(newKnowledgeAsset);
      yield {
        status: "SUCCESS",
        step: "knowledge-asset",
        message: "Knowledge asset generated successfully",
      };
    } catch (error) {
      yield {
        status: "ERROR",
        step: "chunking",
        message: "Chunks generation failed",
      };
    }
  }

  async retrieveKnowledge(
    knowledgeAssetId: string,
    query: string
  ): Promise<string[]> {
    try {
      const knowledgeAsset = await this.repository.getKnowledgeAssetById(
        knowledgeAssetId
      );
      const searchResult = await this.embeddingApi.search({
        text: query,
        topK: 5,
        collectionId: knowledgeAsset.embeddingsCollectionsIds[0],
      });
      const similarQuery = searchResult.map((query) => query.document.content);
      return similarQuery;
    } catch (error) {
      throw error;
    }
  }

  async getFullKnowledgeAssetById(id: string): Promise<FullKnowledgeAssetDTO> {
    const knowledgeAsset = await this.repository.getKnowledgeAssetById(id);
    const file = await this.filesApi.getFileById(knowledgeAsset.filesIds[0]);
    const text = await this.textExtractorApi.getOneText(knowledgeAsset.textsIds[0]);
    const embeddings = await this.embeddingApi.getAllDocuments({collectionId: knowledgeAsset.embeddingsCollectionsIds[0]});
    return {
      ...knowledgeAsset,
      files: [file],
      texts: [text],
      embeddings,
    };
  }

  async getAllKnowledgeAssets(): Promise<KnowledgeAsset[]> {
    const allKnowledgeAssets = await this.repository.getAllKnowledgeAssets();
    console.log({ allKnowledgeAssets });
    return allKnowledgeAssets;
  }

  async getKnowledgeAssetById(id: string): Promise<KnowledgeAsset> {
    return this.repository.getKnowledgeAssetById(id);
  }

  async deleteKnowledgeAsset(id: string): Promise<boolean> {
    return this.repository.deleteKnowledgeAsset(id);
  }
}
