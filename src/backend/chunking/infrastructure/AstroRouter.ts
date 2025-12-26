import type { APIContext } from "astro";
import type { ChunkingApi } from "../@core-contracts/api";

export class AstroRouter {
  constructor(private chunkingApi: ChunkingApi) {}

  chunkText = async ({ request }: APIContext) => {
    const body = await request.json();
    const { text, config } = body;
    const chunkingApi = this.chunkingApi;
    console.log({ chunkingApi });
    return new Response(
      JSON.stringify(await chunkingApi.chunkOne(text, config))
    );
  }
}
