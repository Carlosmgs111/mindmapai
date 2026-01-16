export interface KnowledgeAsset {
    id: string;
    name: string;
    fileId: string;
    textId: string;
    embeddingsCollectionId: string;
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
