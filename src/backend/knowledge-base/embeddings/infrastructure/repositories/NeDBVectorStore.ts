import Datastore from "nedb-promises";
import type { VectorRepository } from "../../@core-contracts/repositories";
import type { VectorDocument } from "../../@core-contracts/entities";
import type { SearchResult, VectorDBConfig } from "../../@core-contracts/dtos";
import path from "path";

export class NeDBVectorStore implements VectorRepository {
  private db: Datastore<any>;
  private dimensions: number;
  private similarityThreshold: number;
  private cosineSimilarity: (vecA: number[], vecB: number[]) => number;

  constructor(config: VectorDBConfig, dbPath?: string) {
    this.dimensions = config.dimensions;
    this.similarityThreshold = config.similarityThreshold || 0.7;
    this.db = Datastore.create({
      filename: dbPath || path.join(process.cwd(), "database", "nedb", "embeddings.db"),
      autoload: true,
    });
    this.cosineSimilarity = this.calculateCosineSimilarity;
    this.tryLoadAiSimilarity();
  }

  private async tryLoadAiSimilarity() {
    try {
      const ai = await import("ai");
      if (ai.cosineSimilarity) this.cosineSimilarity = ai.cosineSimilarity;
    } catch {}
  }

  async initialize(): Promise<void> {
    await this.db.ensureIndex({ fieldName: "collectionId" });
    await this.db.ensureIndex({ fieldName: "collectionId_id", unique: true });
  }

  async addDocument(document: Omit<VectorDocument, "timestamp">, collectionId: string): Promise<void> {
    if (document.embedding.length !== this.dimensions) {
      throw new Error(`Embedding dimension mismatch. Expected ${this.dimensions}, got ${document.embedding.length}`);
    }

    const vectorDoc = {
      ...document,
      collectionId,
      collectionId_id: `${collectionId}:${document.id}`,
      timestamp: Date.now(),
    };

    const existing = await this.db.findOne({ collectionId, id: document.id });
    if (existing) {
      await this.db.update({ collectionId, id: document.id }, vectorDoc);
    } else {
      await this.db.insert(vectorDoc);
    }
  }

  async addDocuments(documents: Omit<VectorDocument, "timestamp">[], collectionId: string): Promise<void> {
    const timestamp = Date.now();
    for (const doc of documents) {
      if (doc.embedding.length !== this.dimensions) {
        throw new Error(`Document ${doc.id}: Embedding dimension mismatch`);
      }
      await this.addDocument(doc, collectionId);
    }
  }

  async getDocument(id: string, collectionId: string): Promise<VectorDocument | null> {
    const doc = await this.db.findOne({ collectionId, id });
    if (!doc) return null;
    const { _id, collectionId_id, collectionId: _, ...vectorDoc } = doc;
    return vectorDoc as VectorDocument;
  }

  async deleteDocument(id: string, collectionId: string): Promise<void> {
    await this.db.remove({ collectionId, id }, {});
  }

  async search(queryEmbedding: number[], topK: number = 5, collectionId: string): Promise<SearchResult[]> {
    if (queryEmbedding.length !== this.dimensions) {
      throw new Error(`Query embedding dimension mismatch. Expected ${this.dimensions}`);
    }

    const documents = await this.db.find({ collectionId });
    const results: SearchResult[] = [];

    for (const doc of documents) {
      const similarity = this.cosineSimilarity(queryEmbedding, doc.embedding);
      if (similarity >= this.similarityThreshold) {
        const { _id, collectionId_id, collectionId: _, ...vectorDoc } = doc;
        results.push({ document: vectorDoc as VectorDocument, similarity });
      }
    }

    return results.sort((a, b) => b.similarity - a.similarity).slice(0, topK);
  }

  async getAllDocuments(collectionId: string): Promise<VectorDocument[]> {
    const documents = await this.db.find({ collectionId });
    return documents.map(({ _id, collectionId_id, collectionId: _, ...vectorDoc }) => vectorDoc as VectorDocument);
  }

  async count(collectionId: string): Promise<number> {
    return await this.db.count({ collectionId });
  }

  async clear(collectionId: string): Promise<void> {
    await this.db.remove({ collectionId }, { multi: true });
  }

  async close(): Promise<void> {}

  private calculateCosineSimilarity(vecA: number[], vecB: number[]): number {
    let dotProduct = 0, normA = 0, normB = 0;
    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }
    const magnitude = Math.sqrt(normA) * Math.sqrt(normB);
    return magnitude === 0 ? 0 : dotProduct / magnitude;
  }
}
