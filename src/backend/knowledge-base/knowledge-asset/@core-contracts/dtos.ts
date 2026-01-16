import type { FileUploadDTO } from "@/modules/files/@core-contracts/dtos";
import type { ChunkingStrategyType } from "@/backend/knowledge-base/chunking/@core-contracts/entities";
import type { KnowledgeAsset } from "./entities";
import type { Text } from "@/modules/knowledge-base/text-extraction/@core-contracts/entities";
import type { File } from "@/modules/files/@core-contracts/entities";
import type { VectorDocument } from "@/backend/knowledge-base/embeddings/@core-contracts/entities";

export interface NewKnowledgeDTO {
  id: string;
  name: string;
  sources: [FileUploadDTO | string];
  chunkingStrategy: ChunkingStrategyType;
  metadata: Record<string, any>;
}

export interface KnowledgeAssetDTO {
  id: string;
  metadata: Record<string, any>;
}

export interface FlowState {
  status: "SUCCESS" | "ERROR";
  step:
    | "file-upload"
    | "text-extraction"
    | "chunking"
    | "embedding"
    | "knowledge-asset";
  message: string;
}

export interface FullKnowledgeAssetDTO extends KnowledgeAsset {
  files: File[];
  texts: Text[];
  embeddings: VectorDocument[];
}

