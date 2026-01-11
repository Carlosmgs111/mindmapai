export class Text {
  constructor(
    public id: string,
    public sourceId: string,
    public content: string,
    public metadata?: {
      author?: string;
      title?: string;
      numpages?: number;
    }
  ) {}

  toDTO() {
    return {
      id: this.id,
      sourceId: this.sourceId,
      content: this.content,
      metadata: this.metadata,
    };
  }
}
