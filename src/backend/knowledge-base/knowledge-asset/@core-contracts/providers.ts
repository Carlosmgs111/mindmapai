export type AIProvider = {
  generateDescription: (text: string) => Promise<string>;
};
