import Datastore from "nedb-promises";
import type { AgentRepository } from "../../@core-contracts/repositories";
import type { AgentDTO } from "../../@core-contracts/dtos";
import path from "path";

export class NeDBAgentRepository implements AgentRepository {
  private db: Datastore<any>;

  constructor(dbPath?: string) {
    this.db = Datastore.create({
      filename: dbPath || path.join(process.cwd(), "database", "nedb", "agents.db"),
      autoload: true,
    });
    this.db.ensureIndex({ fieldName: "id", unique: true });
  }

  async getAgentById(id: string): Promise<AgentDTO> {
    const agent = await this.db.findOne({ id });
    if (!agent) throw new Error(`Agent with id ${id} not found`);
    const { _id, ...agentData } = agent;
    return agentData as AgentDTO;
  }

  async saveAgentById(id: string, agent: AgentDTO): Promise<void> {
    const agentToSave = { ...agent, id };
    const existing = await this.db.findOne({ id });
    if (existing) {
      await this.db.update({ id }, agentToSave);
    } else {
      await this.db.insert(agentToSave);
    }
  }
}
