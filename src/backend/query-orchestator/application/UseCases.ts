import type { AICompletionDTO } from "@/backend/agents/@core-contracts/dtos";
import type { KnowledgeAssetsAPI } from "@/modules/knowledge-base/orchestrator/@core-contracts/api";
import type { AIApi } from "@/backend/agents/@core-contracts/api";

export class UseCases {
  constructor(
    private knowledgeAssetsApi: KnowledgeAssetsAPI,
    private aiApi: AIApi
  ) {}

  async *streamCompletionWithContext(command: AICompletionDTO) {
    console.log("streamCompletionWithContext", command);
    if (!command.context?.knowledgeAssetId) {
      throw new Error("Knowledge asset id is required");
    }
    const similarQuery = await this.knowledgeAssetsApi.retrieveKnowledge(
      command.context.knowledgeAssetId,
      command.userPrompt
    );
    console.log({ similarQuery });
    // const context = `
    // # Response a la siguiente consulta: ${command.userPrompt}
    // ${similarQuery.length > 0 ? `\nContexto: ${similarQuery.join("\n")}` : ""}
    // `;
    // for await (const chunk of this.aiApi.streamCompletion("", {
    //   ...command,
    //   userPrompt: context,
    // })) {
    //   yield chunk;
    // }
  }
}
