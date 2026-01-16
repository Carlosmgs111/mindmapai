export interface KnowledgeAsset {
    id: string;
    name: string;
    version: string;
    filesIds: string[];
    textsIds: string[];
    embeddingsCollectionsIds: string[];
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
