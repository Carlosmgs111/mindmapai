export type EmbeddingsInfrastructurePolicy = {
  provider: "cohere" | "hugging-face" | "openai" | "browser";
  repository: "local-level" | "remote-db" | "browser";
};