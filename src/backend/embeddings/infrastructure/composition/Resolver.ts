import type { EmbeddingProvider } from "../../@core-contracts/providers";
import type { VectorRepository } from "../../@core-contracts/repositories";
import type { EmbeddingsInfrastructurePolicy } from "../../@core-contracts/infrastructurePolicies";

export class EmbeddingsInfrastructureResolver {
  static async resolve(policy: EmbeddingsInfrastructurePolicy): Promise<{
    provider: EmbeddingProvider;
    repository: VectorRepository;
  }> {
    const provider = await EmbeddingsInfrastructureResolver.resolveProvider(policy.provider);
    const dimensions = provider.getDimensions();

    return {
      provider,
      repository: await EmbeddingsInfrastructureResolver.resolveRepository(policy.repository, dimensions),
    };
  }

  private static async resolveProvider(
    type: EmbeddingsInfrastructurePolicy["provider"]
  ): Promise<EmbeddingProvider> {
    switch (type) {
      case "cohere": {
        const { AIEmbeddingProvider } = await import("../providers/AIEmbeddingProvider");
        return new AIEmbeddingProvider();
      }
      case "hugging-face": {
        const { HuggingFaceEmbeddingProvider } = await import("../providers/HuggingFaceEmbeddingProvider");
        return new HuggingFaceEmbeddingProvider();
      }
      case "browser": {
        const { BrowserEmbeddingProvider } = await import("../providers/BrowserEmbeddingProvider");
        return new BrowserEmbeddingProvider();
      }
      case "openai": {
        // TODO: Create OpenAIProvider
        const { AIEmbeddingProvider } = await import("../providers/AIEmbeddingProvider");
        return new AIEmbeddingProvider();
      }
      default:
        throw new Error(`Unsupported provider: ${type}`);
    }
  }

  private static async resolveRepository(
    type: EmbeddingsInfrastructurePolicy["repository"],
    dimensions: number
  ): Promise<VectorRepository> {
    switch (type) {
      case "local-level": {
        const { LevelVectorStore } = await import("../repositories/LocalLevelVectorDB");
        return new LevelVectorStore({
          dimensions,
          similarityThreshold: 0.7,
          dbPath: "./embeddings.db",
        });
      }
      case "remote-db": {
        // TODO: Create RemoteVectorDB
        const { LevelVectorStore } = await import("../repositories/LocalLevelVectorDB");
        return new LevelVectorStore({
          dimensions,
          similarityThreshold: 0.7,
          dbPath: "./embeddings.db",
        });
      }
      case "browser": {
        const { BrowserVectorDB } = await import("../repositories/BrowserVectorDB");
        return new BrowserVectorDB({
          dimensions,
          similarityThreshold: 0.7,
          dbName: "embeddings-db",
        });
      }
      default:
        throw new Error(`Unsupported repository: ${type}`);
    }
  }
}