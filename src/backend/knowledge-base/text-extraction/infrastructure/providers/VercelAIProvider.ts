import type { AIProvider } from "../../@core-contracts/providers";
import { createHuggingFace } from "@ai-sdk/huggingface";
import { generateText } from "ai";
import type { LanguageModel } from "ai";

/**
 * Vercel AI SDK provider for edge runtime
 * Supports multiple AI providers (OpenAI, Anthropic, Cohere, etc.)
 */
export class VercelAIProvider implements AIProvider {
  private model: any;
  private systemPrompt: string;

  constructor(
    model: LanguageModel,
    systemPrompt: string = "You are a helpful assistant that creates concise, accurate descriptions of text content."
  ) {
    this.model = createHuggingFace({
      apiKey: import.meta.env.HF_API_KEY,
    })
    this.systemPrompt = systemPrompt;
  }

  /**
   * Generate a description from text using Vercel AI SDK
   */
  async generateDescription(text: string): Promise<string> {
    try {
      const prompt = `Generate a concise description (2-3 sentences) summarizing the following text:\n\n${text.substring(0, 2000)}`;
      console.log(this.model);
      const { text: description } = await generateText( {
        model: this.model("deepseek-ai/DeepSeek-V3-0324"),
        system: this.systemPrompt,
        prompt,
        temperature: 0.7,
      });

      return description.trim();
    } catch (error) {
      console.error("[VercelAI] Error generating description:", error);
      throw new Error(`Failed to generate description: ${error}`);
    }
  }

  /**
   * Generate a description with streaming support
   */
  async *generateDescriptionStream(text: string): AsyncGenerator<string> {
    try {
      const prompt = `Generate a concise description (2-3 sentences) summarizing the following text:\n\n${text.substring(0, 2000)}`;

      const result = this.model("deepseek-ai/DeepSeek-V3-0324").stream({
        system: this.systemPrompt,
        prompt,
        temperature: 0.7,
      });

      for await (const chunk of result.textStream) {
        yield chunk;
      }
    } catch (error) {
      console.error("[VercelAI] Error streaming description:", error);
      throw new Error(`Failed to stream description: ${error}`);
    }
  }

  /**
   * Update the model
   */
  setModel(model: LanguageModel): void {
    this.model = model;
  }

  /**
   * Update the system prompt
   */
  setSystemPrompt(prompt: string): void {
    this.systemPrompt = prompt;
  }
}
