
import { textExtractorApiFactory } from "../../../backend/text-extraction";
import {AstroRouter} from "../../../backend/text-extraction/infrastructure/routes/AstroRouter";

const textsRouter = new AstroRouter(textExtractorApiFactory);
// export const GET = textsRouter.getText;
// export const POST = textsRouter.generateMindmapFromFile;
export const DELETE = textsRouter.deleteText;
