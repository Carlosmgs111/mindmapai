import { mindmapRouter } from "../../../backend/mindmapManage";

export const GET = mindmapRouter.getText;
export const POST = mindmapRouter.uploadFileAndGenerateMindmap;
export const DELETE = mindmapRouter.removeMindmap;
// export const POST = mindmapRouter.generateNewMindmapFromStoredFile;

