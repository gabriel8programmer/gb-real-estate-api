import { Agents } from "../models/Agents";

export class AgentServices {
  constructor(private readonly agentsModel: Agents) {}

  async getAgentById(id: number) {}

  async createAgent() {}

  async updateAgentById(id: number) {}

  async deleteAgentById(id: number) {}
}
