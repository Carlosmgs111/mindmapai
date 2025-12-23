import type { AgentRepository } from "../../@core-contracts/repositories";
import type { AgentDTO } from "../../@core-contracts/dtos";

export class LocalLevelAgentRepository implements AgentRepository {
    constructor() {}
    getAgentById(id: string): Promise<AgentDTO> {
        throw new Error("Method not implemented.");
    }
    saveAgentById(id: string, agent: AgentDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }
}