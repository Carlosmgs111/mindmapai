import type { TextExtractDTO } from "./dtos";

export interface TextExtractor {
  extractTextFromPDF(
    fileBuffer: Buffer
  ): Promise<TextExtractDTO | null>;
}

export interface TextCleaner {
    cleanText(textExtract: TextExtractDTO): Promise<TextExtractDTO>;
}