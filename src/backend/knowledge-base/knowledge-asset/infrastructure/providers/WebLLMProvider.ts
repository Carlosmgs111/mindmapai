import type { AIProvider } from "../../@core-contracts/providers";
import * as webllm from "@mlc-ai/web-llm";

/**
 * WebLLM provider for browser-based AI inference
 * Runs models directly in the browser using WebGPU
 */
export class WebLLMProvider implements AIProvider {
  private engine: webllm.MLCEngine | null = null;
  private modelId: string;
  private initPromise: Promise<void> | null = null;

  constructor(modelId: string = "Qwen3-0.6B-q4f32_1-MLC") {
    this.modelId = modelId;
  }

  /**
   * Initialize the WebLLM engine
   */
  private async initialize(): Promise<void> {
    if (this.engine) return;

    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = (async () => {
      try {
        this.engine = await webllm.CreateMLCEngine(this.modelId, {
          initProgressCallback: (progress) => {
            console.log(`[WebLLM] Loading model: ${progress.text} (${Math.round(progress.progress * 100)}%)`);
          },
        });
        console.log(`[WebLLM] Model ${this.modelId} loaded successfully`);
      } catch (error) {
        console.error("[WebLLM] Failed to initialize engine:", error);
        throw new Error(`Failed to initialize WebLLM engine: ${error}`);
      }
    })();

    return this.initPromise;
  }

  /**
   * Generate a description from text using WebLLM
   */
  async generateDescription(text: string): Promise<string> {
    await this.initialize();

    if (!this.engine) {
      throw new Error("WebLLM engine is not initialized");
    }

    try {
      const prompt = `Generate a concise description (2-3 sentences) summarizing the following text:\n\n${text.substring(0, 2000)}`;

      const response = await this.engine.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that creates concise, accurate descriptions of text content.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 150,
      });

      const description = response.choices[0]?.message?.content || "No description generated";
      return description.trim();
    } catch (error) {
      console.error("[WebLLM] Error generating description:", error);
      throw new Error(`Failed to generate description: ${error}`);
    }
  }

  /**
   * Set a different model
   */
  async setModel(modelId: string): Promise<void> {
    if (this.modelId === modelId && this.engine) {
      return;
    }

    // Unload current model if exists
    if (this.engine) {
      await this.unload();
    }

    this.modelId = modelId;
    await this.initialize();
  }

  /**
   * Unload the model and free resources
   */
  async unload(): Promise<void> {
    if (this.engine) {
      await this.engine.unload();
      this.engine = null;
      this.initPromise = null;
      console.log("[WebLLM] Model unloaded");
    }
  }

  /**
   * Get available models
   */
  static getAvailableModels(): string[] {
    return webllm.prebuiltAppConfig.model_list.map((model) => model.model_id);
  }

  /**
   * Check if WebGPU is supported
   */
  static async isSupported(): Promise<boolean> {
    if (typeof navigator === "undefined" || !(navigator as any).gpu) {
      return false;
    }

    try {
      const adapter = await (navigator as any).gpu.requestAdapter();
      return adapter !== null;
    } catch {
      return false;
    }
  }
}
