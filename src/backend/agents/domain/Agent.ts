import type { AgentDTO } from "../@core-contracts/dtos";

export class Agent {
  private model: string;
  private id: string;
  private name: string;
  private description: string;
  private instructions: string; // Prompt template reference
  private tools: string[]; // Tool references
  constructor({ model, id, name, description, instructions, tools }: AgentDTO) {
    this.model = model;
    this.id = id;
    this.name = name;
    this.description = description;
    this.instructions = instructions;
    this.tools = tools;
  }
  toDTO(): AgentDTO {
    return {
      model: this.model,
      id: this.id,
      name: this.name,
      description: this.description,
      instructions: this.instructions,
      tools: this.tools,
    };
  }
}
