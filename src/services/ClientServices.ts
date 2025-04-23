import { HttpError } from "../errors/HttpError";
import { Clients } from "../models/Clients";
import { Users } from "../models/Users";
import { CreateClientParams } from "../models/types/clients";

export class ClientServices {
  constructor(private readonly usersModel: Users, private readonly clientsModel: Clients) {}

  async getClientById(id: number) {
    const client = await this.clientsModel.findById(id);
    if (!client) throw new HttpError(404, "Client not found!");
    return client;
  }

  async createClient(params: CreateClientParams) {
    const user = await this.usersModel.findById(params.userId);
    // validations
    if (!user) throw new HttpError(404, "Invalid User ID!");
    if (user.role !== "CLIENT") throw new HttpError(401, "User is not CLIENT");

    return this.clientsModel.create(params);
  }

  async updateClientById(id: number, params: Partial<Omit<CreateClientParams, "userId">>) {
    const updatedClient = await this.clientsModel.updateById(id, params);
    if (!updatedClient) throw new HttpError(404, "Client not found!");
    return updatedClient;
  }

  async deleteClientById(id: number) {
    const deletedClient = await this.clientsModel.deleteById(id);
    if (!deletedClient) throw new HttpError(404, "Client not found!");
    return deletedClient;
  }
}
