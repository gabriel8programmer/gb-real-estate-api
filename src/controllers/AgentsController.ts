import { Handler } from "express";
import { AgentServices } from "../services/AgentServices";

export class AgentsController {
  constructor(private readonly agentServices: AgentServices) {}

  show: Handler = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  save: Handler = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  };
}
