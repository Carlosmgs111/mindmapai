import { chunkingApiFactory } from "@/modules/knowledge-base/chunking";
import { AstroRouter } from "@/modules/knowledge-base/chunking/infrastructure/AstroRouter";

const chunkingRouter = new AstroRouter(chunkingApiFactory);

export const POST = chunkingRouter.chunkText;
