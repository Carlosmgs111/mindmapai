export type TextExtractionInfrastructurePolicy = {
  extractor: "pdf" | "browser-pdf" | "docx" | "txt";
  repository: "local-level" | "remote-db" | "browser";
  aiProvider: "web-llm" | "vercel-ai";
};