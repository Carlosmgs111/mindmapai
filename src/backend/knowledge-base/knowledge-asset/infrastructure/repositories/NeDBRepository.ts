import Datastore from "nedb-promises";
import type { KnowledgeAsset } from "../../@core-contracts/entities";
import type { KnowledgeAssetsRepository } from "../../@core-contracts/repositories";
import path from "path";

export class NeDBRepository implements KnowledgeAssetsRepository {
  private db: Datastore<any>;

  constructor(dbPath?: string) {
    this.db = Datastore.create({
      filename: dbPath || path.join(process.cwd(), "database", "nedb", "knowledge-assets.db"),
      autoload: true,
    });
    this.db.ensureIndex({ fieldName: "id", unique: true });
  }

  async saveKnowledgeAsset(knowledgeAsset: KnowledgeAsset): Promise<void> {
    const existing = await this.db.findOne({ id: knowledgeAsset.id });
    const data = {
      ...knowledgeAsset,
      createdAt: existing?.createdAt || knowledgeAsset.createdAt || new Date(),
      updatedAt: new Date(),
    };

    if (existing) {
      await this.db.update({ id: knowledgeAsset.id }, data);
    } else {
      await this.db.insert(data);
    }
  }

  async getAllKnowledgeAssets(): Promise<KnowledgeAsset[]> {
    const assets = await this.db.find({});
    return assets.map(({ _id, ...asset }: any) => ({
      ...asset,
      metadata: asset.metadata || {},
      createdAt: new Date(asset.createdAt),
      updatedAt: new Date(asset.updatedAt),
    }));
  }

  async getKnowledgeAssetById(id: string): Promise<KnowledgeAsset> {
    const asset = await this.db.findOne({ id });
    if (!asset) throw new Error(`Knowledge asset with id ${id} not found`);

    const { _id, ...data } = asset;
    return {
      ...data,
      metadata: data.metadata || {},
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  }

  async deleteKnowledgeAsset(id: string): Promise<boolean> {
    const numRemoved = await this.db.remove({ id }, {});
    return numRemoved > 0;
  }
}
