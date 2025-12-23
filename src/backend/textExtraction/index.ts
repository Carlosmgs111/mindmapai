/*  //TODO textExtraction -> document-ingestion
    * this is module will process the documents and extract the text from them
    * - Process file buffer
      * - Extract text from buffer
      * - Clean the text
      * - Save the text in database
    * - Chunking text
 */
import type { TextExtractorApi } from "./@core-contracts/textExtractorApi";
import { AstroRouter } from "./infrastructure/routes/AstroRouter";
import { PDFTextExtractor } from "./infrastructure/extraction/PDFTextExtractor";
import { UseCases } from "./application/UseCases";
import { LocalLevelRepository } from "./infrastructure/repository/LocalLevelRepository";

const pdfTextExtractor = new PDFTextExtractor();
const textRepository = new LocalLevelRepository();
export const textExtractorApi: TextExtractorApi = new UseCases(
  pdfTextExtractor,
  textRepository
);
export const textsRouter = new AstroRouter(textExtractorApi);
