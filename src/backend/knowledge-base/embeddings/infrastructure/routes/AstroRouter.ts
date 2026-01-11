import type { APIContext } from "astro";
import type { EmbeddingAPI } from "../../@core-contracts/api";
import type { EmbeddingsInfrastructurePolicy } from "../../@core-contracts/infrastructurePolicies";

export class AstroRouter {
  private embeddingAPI: Promise<EmbeddingAPI>;
  constructor(
    embeddingApiFactory: (policy: EmbeddingsInfrastructurePolicy) => Promise<EmbeddingAPI>
  ) {
    this.embeddingAPI = embeddingApiFactory({
      provider: "node-hf",
      repository: "leveldb",
    });
  }

  generateEmbeddings = async ({ request }: APIContext) => {
    const { texts } = await request.json();
    const embeddings = await (await this.embeddingAPI).generateEmbeddings(texts);
    return new Response(JSON.stringify(embeddings));
  };
  getAllDocuments = async ({ request }: APIContext) => {
    console.log("getAllDocuments", { embeddingAPI: this.embeddingAPI });
    const documents = await (await this.embeddingAPI).getAllDocuments();
    return new Response(JSON.stringify(documents));
  };
  search = async ({ request }: APIContext) => {
    const { text, topK } = await request.json();
    const results = await (await this.embeddingAPI).search(text, topK);
    return new Response(JSON.stringify(results));
  };
}
