import { embeddingApiFactory } from "@/modules/knowledge-base/embeddings";
import { AstroRouter } from "@/modules/knowledge-base/embeddings/infrastructure/routes/AstroRouter";

const embeddingsRouter = new AstroRouter(embeddingApiFactory);

export const POST = embeddingsRouter.generateEmbeddings;
export const GET = embeddingsRouter.getAllDocuments;
export const PUT = embeddingsRouter.search;

