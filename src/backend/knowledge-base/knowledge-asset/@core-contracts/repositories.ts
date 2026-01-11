import type { KnowledgeAsset } from "./entities";

export interface KnowledgeAssetsRepository {
  saveKnowledgeAsset(knowledgeAsset: KnowledgeAsset): Promise<void>;
  getAllKnowledgeAssets(): Promise<KnowledgeAsset[]>;
  getKnowledgeAssetById(id: string): Promise<KnowledgeAsset>;
  deleteKnowledgeAsset(id: string): Promise<boolean>;
}
