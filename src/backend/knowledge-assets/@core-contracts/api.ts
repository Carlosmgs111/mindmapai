export interface KnowledgeAssetsAPI {
    generateNewKnowledge(document: string): Promise<void>;
    retrieveKnowledge(document: string): Promise<void>;
}