import type { AIApi } from "./@core-contracts/aiApi";
import { AISDKProvider } from "./infrastructure/AIProvider/AIProvider";
import { AIUsesCases } from "./application/UsesCases";

const aiProvider = new AISDKProvider();
export const aiApi: AIApi = new AIUsesCases(aiProvider);

