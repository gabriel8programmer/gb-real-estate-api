import { Agent } from "@prisma/client";

export interface AgentCreateParams {
  license: string;
  bio?: string;
  phone?: string;
  userId: number;
}

export interface AgentsRepository {
  findById: (id: number) => Promise<Agent | null>;
  create: (params: AgentCreateParams) => Promise<Agent>;
  updateById: (id: number, params: Partial<AgentCreateParams>) => Promise<Agent | null>;
  deleteById: (id: number) => Promise<Agent | null>;
}
