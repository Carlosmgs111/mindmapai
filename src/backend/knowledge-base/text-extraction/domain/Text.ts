export class Text {
  constructor(
    public id: string,
    public sourceId: string,
    public content: string,
    public description: string,
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
      description: this.description,
      metadata: this.metadata,
    };
  }
}
