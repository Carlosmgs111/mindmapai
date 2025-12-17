import { filesApi } from "../files";
import { textExtractorApi } from "../textExtraction";
import { aiApi } from "../AI";

import { AstroRouter } from "./infrastructure/routes/AstroRouter";
import { UseCases } from "./application/UseCases";

export const mindmapsApi = new UseCases(filesApi, textExtractorApi, aiApi);
export const mindmapsRouter = new AstroRouter(mindmapsApi);
