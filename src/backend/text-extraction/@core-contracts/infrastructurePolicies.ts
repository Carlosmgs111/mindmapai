export type TextExtractionInfrastructurePolicy = {
  extractor: "pdf" | "browser-pdf" | "docx" | "txt";
  repository: "local-level" | "remote-db" | "browser";
};