import { AgentsController } from "../controllers/AgentsController";
import { Agents } from "../models/Agents";
import { AgentServices } from "../services/AgentServices";

export const agentsModel = new Agents();
export const agentServices = new AgentServices(agentsModel);
export const agentsController = new AgentsController(agentServices);
