import { knowledgeAssetsApiFactory } from "@/modules/knowledge-base/knowledge-assets";
import { AstroRouter } from "@/modules/knowledge-base/knowledge-assets/infrastructure/routes/AstroRouter";
console.log("knowledgeAssetsApiFactory", knowledgeAssetsApiFactory);
const knowledgeAssetsRouter = new AstroRouter(knowledgeAssetsApiFactory);

export const POST = knowledgeAssetsRouter.generateKnowledgeStreamingState;