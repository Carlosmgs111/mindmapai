export interface KnowledgeAsset {
    id: string;
    sourcesIds: string[];
    cleanedTextIds: string[];
    embeddingsIds: string[];
    metadata: Record<string, any>;
    createdAt: Date;
    updatedAt: Date;
}
