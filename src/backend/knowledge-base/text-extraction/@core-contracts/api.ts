import type { Text } from "./entities";
import type { TextExtractParams, TextExtractionResultDTO, TextIndexDTO } from "./dtos";

export interface FlowState {
    status: "success" | "error";
    message?: string;
}


export interface TextExtractorApi {
    extractTextFromPDF(command: Omit<TextExtractParams, 'collectionId'>): Promise<TextExtractionResultDTO>;
    getOneText(id: string): Promise<Text | undefined>;
    getAllTexts(): Promise<Text[]>;
    getAllIndexes(): Promise<TextIndexDTO[]>;
    removeText(id: string): Promise<boolean>;
}
