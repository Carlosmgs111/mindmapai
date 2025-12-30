import type { GenerateNewKnowledgeDTO } from "./dtos";
import type { KnowledgeAssetDTO } from "./dtos";

export interface FlowState {
  status: "success" | "error";
  step:
    | "fileUpload"
    | "textExtraction"
    | "chunking"
    | "embedding"
    | "knowledgeAsset";
  message?: string;
}

export interface KnowledgeAssetsAPI {
  generateNewKnowledge(
    document: GenerateNewKnowledgeDTO
  ): Promise<KnowledgeAssetDTO>;
  generateNewKnowledgeStreamingState(
    sourceDocument: GenerateNewKnowledgeDTO
  ): AsyncGenerator<KnowledgeAssetDTO | FlowState>;
  retrieveKnowledge(document: string): Promise<void>;
}
