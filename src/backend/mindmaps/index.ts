import { filesApiFactory } from "@/modules/files";
import { textExtractorApiFactory } from "@/modules/knowledge-base/text-extraction";
import { aiApiFactory } from "@/modules/agents";

import { AstroRouter } from "./infrastructure/routes/AstroRouter";
import { UseCases } from "./application/UseCases";

export const mindmapsApi = new UseCases(filesApiFactory, textExtractorApiFactory, aiApiFactory);
export const mindmapsRouter = new AstroRouter(mindmapsApi);
