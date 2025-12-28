export interface KnowledgeAssetsRepository {
  saveKnowledgeAsset(knowledgeAsset: any): Promise<void>;
  getAllKnowledgeAssets(): Promise<any[]>;
  getKnowledgeAssetById(id: string): Promise<any>;
  deleteKnowledgeAsset(id: string): Promise<void>;
}
