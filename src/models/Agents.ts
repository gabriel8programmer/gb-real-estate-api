import { Agent } from "@prisma/client";
import { AgentCreateParams, AgentsRepository } from "../types/utils/agents";
import { prisma } from "../configs/prisma";

export class Agents implements AgentsRepository {
  async findById(id: number): Promise<Agent | null> {
    return prisma.agent.findUnique({ where: { id }, include: { user: true } });
  }

  async create(params: AgentCreateParams): Promise<Agent> {
    return prisma.agent.create({ data: params });
  }

  async updateById(id: number, params: Partial<AgentCreateParams>): Promise<Agent | null> {
    return prisma.agent.update({ where: { id }, data: params });
  }

  async deleteById(id: number): Promise<Agent | null> {
    return prisma.agent.delete({ where: { id } });
  }
}
