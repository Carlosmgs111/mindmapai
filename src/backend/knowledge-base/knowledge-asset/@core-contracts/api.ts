import type { NewKnowledgeDTO, KnowledgeAssetDTO } from "./dtos";
import type { KnowledgeAsset } from "./entities";

export interface KnowledgeAssetApi {
  generateKnowledgeAsset(dto: NewKnowledgeDTO): Promise<KnowledgeAssetDTO>;
  getAllKnowledgeAssets(): Promise<KnowledgeAsset[]>;
  getKnowledgeAssetById(id: string): Promise<KnowledgeAsset>;
  deleteKnowledgeAsset(id: string): Promise<boolean>;
}
