import type { KnowledgeAsset } from "@/backend/knowledge-base/knowledge-asset";
import {atom} from "nanostores";

export const knowledgeAssetsStore = atom<KnowledgeAsset[]>([]);
