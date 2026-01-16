export type KnowledgeAssetInfrastructurePolicy = {
  repository: "leveldb" | "idb" | "nedb";
  aiProvider: "web-llm" | "vercel-ai";
};
