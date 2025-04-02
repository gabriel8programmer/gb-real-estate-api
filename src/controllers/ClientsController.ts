import { Handler } from "express";
import { Clients } from "../models/Clients";
import { CreateClientRequestSchema } from "./schemas/ClientsRequestSchema";

export class ClientsController {
  constructor(private readonly clientsModel: Clients) {}

  show: Handler = async (req, res, next) => {
    try {
      const client = await this.clientsModel.findById(+req.params.id);
      res.json(client);
    } catch (error) {
      next(error);
    }
  };

  save: Handler = async (req, res, next) => {
    try {
      const body = CreateClientRequestSchema.parse(req.body);
      const newClient = await this.clientsModel.create(body);
      res.status(201).json({ newClient });
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const body = CreateClientRequestSchema.partial().parse(req.body);
      const updatedClient = await this.clientsModel.updateById(id, body);

      res.json({ updatedClient });
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const deletedClient = await this.clientsModel.deleteById(+req.params.id);
      res.json({ deletedClient });
    } catch (error) {
      next(error);
    }
  };
}
