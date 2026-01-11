export type TextExtractionInfrastructurePolicy = {
  extractor: "pdf" | "browser-pdf" | "docx" | "txt";
  repository: "leveldb" | "idb";
};