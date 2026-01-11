import type { KnowledgeAssetApi } from "../@core-contracts/api";
import type { NewKnowledgeDTO } from "../@core-contracts/dtos";
import type { KnowledgeAssetsRepository } from "../@core-contracts/repositories";
import type { KnowledgeAsset } from "../@core-contracts/entities";

export class KnowledgeAssetUseCases implements KnowledgeAssetApi {
  constructor(private repository: KnowledgeAssetsRepository) {}

  async generateKnowledgeAsset(dto: NewKnowledgeDTO): Promise<KnowledgeAsset> {
    // Create a new knowledge asset
    const knowledgeAsset: KnowledgeAsset = {
      id: crypto.randomUUID(),
      sourcesIds: dto.sources.map((source) => (typeof source === "string" ? source : source.id)),
      cleanedTextIds: dto.cleanedTextIds,
      embeddingsIds: dto.embeddingsIds,
      metadata: dto.metadata,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await this.repository.saveKnowledgeAsset(knowledgeAsset);
    return knowledgeAsset;
  }

  async getAllKnowledgeAssets(): Promise<KnowledgeAsset[]> {
    return this.repository.getAllKnowledgeAssets();
  }

  async getKnowledgeAssetById(id: string): Promise<KnowledgeAsset> {
    return this.repository.getKnowledgeAssetById(id);
  }

  async deleteKnowledgeAsset(id: string): Promise<boolean> {
    return  this.repository.deleteKnowledgeAsset(id);
  }
}
