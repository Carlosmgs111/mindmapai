export type EmbeddingsInfrastructurePolicy = {
  provider: "vercel-ai" | "browser-hf" | "node-hf";
  repository: "leveldb" | "idb" | "nedb";
};