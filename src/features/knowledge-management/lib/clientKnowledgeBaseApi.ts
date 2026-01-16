import type { KnowledgeAssetsAPI } from "@/modules/knowledge-base/orchestrator/@core-contracts/api";
import type { KnowledgeAssetsInfrastructurePolicy } from "@/modules/knowledge-base/orchestrator/@core-contracts/infrastructurePolicies";
import { knowledgeAssetsApiFactory } from "@/modules/knowledge-base/orchestrator";

export const clientKnowledgeBaseApiFactory = async () => {
    const policy: KnowledgeAssetsInfrastructurePolicy = {
        filesPolicy: {
          storage: "browser-mock",
          repository: "idb",
        },
        textExtractionPolicy: {
          extractor: "browser-pdf",
          repository: "idb",
        },
        chunkingPolicy: {
          strategy: "fixed",
        },
        embeddingsPolicy: {
          provider: "browser-hf",
          repository: "idb",
        },
        knowledgeAssetPolicy: {
          repository: "idb",
          aiProvider: "web-llm",
        },
      }
  const api: KnowledgeAssetsAPI = await knowledgeAssetsApiFactory(policy);
  return api;
};
