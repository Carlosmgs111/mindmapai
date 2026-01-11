import { knowledgeAssetsApiFactory } from "@/modules/knowledge-base/orchestrator";
import { AstroRouter } from "@/modules/knowledge-base/orchestrator/infrastructure/routes/AstroRouter";
console.log("knowledgeAssetsApiFactory", knowledgeAssetsApiFactory);
const knowledgeAssetsRouter = new AstroRouter(knowledgeAssetsApiFactory);

export const POST = knowledgeAssetsRouter.generateKnowledgeStreamingState;
export const DELETE = knowledgeAssetsRouter.deleteKnowledgeAsset;
