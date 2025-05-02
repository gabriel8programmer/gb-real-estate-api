import { z } from "zod";

export const RentalRequestStatus = z.enum(["Pending", "Aproved", "Rejected"]);

export const RentalRequestQueryParams = z
  .object({
    page: z.coerce.number(),
    pageSize: z.coerce.number(),
    status: RentalRequestStatus,
    clientId: z.coerce.number(),
    propertyId: z.coerce.number(),
    order: z.enum(["asc", "desc"]).default("asc"),
    orderBy: z.enum(["createdAt", "id", "endDate"]),
  })
  .partial();

export const CreateRentalRequestSchema = z.object({
  clientId: z.number(),
  propertyId: z.number(),
  budget: z.number(),
  endDate: z.coerce.date(),
  status: RentalRequestStatus.default("Pending"),
});

export const UpdateRentalRequestSchema = CreateRentalRequestSchema.partial();
