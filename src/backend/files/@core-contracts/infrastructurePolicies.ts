export type FilesInfrastructurePolicy = {
  storage: "node-fs" | "browser-fs" | "browser-mock";
  repository: "csv" | "idb";
};
