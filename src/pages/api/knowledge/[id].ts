import { knowledgeAssetsApiFactory } from "@/modules/knowledge-assets";
import { AstroRouter } from "@/modules/knowledge-assets/infrastructure/routes/AstroRouter";
console.log("knowledgeAssetsApiFactory", knowledgeAssetsApiFactory);
const knowledgeAssetsRouter = new AstroRouter(knowledgeAssetsApiFactory);

export const POST = knowledgeAssetsRouter.generateKnowledgeStreamingState;