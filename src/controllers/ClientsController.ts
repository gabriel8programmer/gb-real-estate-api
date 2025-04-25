import { Handler } from "express";
import { CreateClientRequestSchema } from "../types/schemas/ClientsRequestSchema";
import { ClientServices } from "../services/ClientServices";

export class ClientsController {
  constructor(private readonly clientServices: ClientServices) {}

  show: Handler = async (req, res, next) => {
    try {
      const client = await this.clientServices.getClientById(+req.params.id);
      res.json(client);
    } catch (error) {
      next(error);
    }
  };

  save: Handler = async (req, res, next) => {
    try {
      const body = CreateClientRequestSchema.parse(req.body);
      const newClient = await this.clientServices.createClient(body);
      res.status(201).json({ newClient });
    } catch (error) {
      next(error);
    }
  };

  update: Handler = async (req, res, next) => {
    try {
      const id = +req.params.id;
      const body = CreateClientRequestSchema.partial().parse(req.body);
      const updatedClient = await this.clientServices.updateClientById(id, body);

      res.json({ updatedClient });
    } catch (error) {
      next(error);
    }
  };

  delete: Handler = async (req, res, next) => {
    try {
      const deletedClient = await this.clientServices.deleteClientById(+req.params.id);
      res.json({ deletedClient });
    } catch (error) {
      next(error);
    }
  };
}
