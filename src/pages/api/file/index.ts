import { filesApiFactory } from "../../../backend/files";
import {AstroRouter} from "../../../backend/files/infrastructure/routes/AstroRouter";

const filesRouter = new AstroRouter(filesApiFactory);

export const GET = filesRouter.getAllFiles;