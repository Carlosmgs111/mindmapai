export interface FileData {
  id: string;
  name: string;
  size: number;
  lastModified: number;
  type: string;
  url: string;
}

export type ExecEnvironment = "browser" | "server";
