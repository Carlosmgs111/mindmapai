import { knowledgeAssetApiFactory } from "@/backend/knowledge-base/knowledge-asset";
import { AstroRouter } from "@/backend/knowledge-base/knowledge-asset/infrastructure/routes/AstroRouter";
const astroRouter = new AstroRouter(knowledgeAssetApiFactory);

export const GET = astroRouter.getAllKnowledgeAssets;

