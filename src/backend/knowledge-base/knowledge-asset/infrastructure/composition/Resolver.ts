import type { KnowledgeAssetInfrastructurePolicy } from "../../@core-contracts/infrastructurePolicies";
import type { KnowledgeAssetsRepository } from "../../@core-contracts/repositories";
import type { AIProvider } from "../../@core-contracts/providers";
export class KnowledgeAssetInfrastructureResolver {
  static async resolve(policy: KnowledgeAssetInfrastructurePolicy): Promise<{
    repository: KnowledgeAssetsRepository;
    aiProvider: AIProvider;
  }> {
    return {
      repository: await KnowledgeAssetInfrastructureResolver.resolveRepository(policy.repository),
      aiProvider: await KnowledgeAssetInfrastructureResolver.resolveAIProvider(policy.aiProvider),
    };
  }

  private static async resolveRepository(
    type: KnowledgeAssetInfrastructurePolicy["repository"]
  ): Promise<KnowledgeAssetsRepository> {
    const resolverTypes = {
      "leveldb": async () => {
        const { LevelDBRepository } = await import("../repositories/LevelDBRepository");
        return new LevelDBRepository();
      },
      idb: async () => {
        const { IDBRepository } = await import("../repositories/IDBRepository");
        return new IDBRepository();
      },
    };
    if (!resolverTypes[type]) {
      throw new Error(`Unsupported repository: ${type}`);
    }
    return resolverTypes[type]();
  }
  private static async resolveAIProvider(
    type: KnowledgeAssetInfrastructurePolicy["aiProvider"]
  ): Promise<AIProvider> {
    const resolverTypes = {
      "web-llm": async () => {
        const { WebLLMProvider } = await import("../providers/WebLLMProvider");
        return new WebLLMProvider();
      },
      "vercel-ai": async () => {
        const { VercelAIProvider } = await import("../providers/VercelAIProvider");
        const { cohere } = await import("@ai-sdk/cohere");
        return new VercelAIProvider(cohere("command-r-plus"));
      },
    };
    if (!resolverTypes[type]) {
      throw new Error(`Unsupported AI provider: ${type}`);
    }
    return resolverTypes[type]();
  }
}
