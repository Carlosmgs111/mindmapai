export interface Text {
  id: string;
  content: string;
  sourceId: string;
  description?: string;
  metadata?: {
    author?: string;
    title?: string;
    numpages?: number;
  };
}

export interface Source {
  id: string;
  name?: string;
  type?: string;
  path?: string;
}
