export interface AICompletionDTO {
    systemPrompt: string;
    userPrompt: string;
    context?: {
        knowledgeAssetId: string;
    };
}