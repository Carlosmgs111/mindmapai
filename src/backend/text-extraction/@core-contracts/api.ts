import type { Text } from "./entities";
import type { TextExtractParams, TextExtractionResultDTO } from "./dtos";

export interface FlowState {
    status: "success" | "error";
    message?: string;
}


export interface TextExtractorApi {
    extractTextFromPDF(command: TextExtractParams): Promise<TextExtractionResultDTO>;
    getOneText(id: string): Promise<Text>;
    getAllTexts(): Promise<Text[]>;
    getAllIndexes(): Promise<string[]>;
    removeText(id: string): Promise<boolean>;
}
