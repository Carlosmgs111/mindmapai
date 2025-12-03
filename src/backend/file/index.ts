import { FileManagerUseCases } from "./application/UseCases";
import { LocalStorage } from "./infrastructure/storage/LocalStorage";
import { AstroRouter } from "./infrastructure/routes/AstroRouter";

export const fileManagerUseCases = new FileManagerUseCases(new LocalStorage());

export const fileManagerRouter = new AstroRouter(fileManagerUseCases);
