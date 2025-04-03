import { z } from "zod";

export const LocationSchema = z
  .object({
    street: z.string(),
    number: z.string(),
    complement: z.string(),
    city: z.string(),
    state: z.string(),
    country: z.string(),
    cep: z.string(),
    coords: z.object({
      lat: z.number(),
      lng: z.number(),
    }),
  })
  .partial();

export const CreateImageSchema = z.object({
  url: z.string(),
});

export const CreatePropertiesRequestSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  price: z.number(),
  size: z.number().optional(),
  bedrooms: z.number().optional(),
  bathrooms: z.number().optional(),
  status: z.enum(["Available", "Rented", "Under_maintenance"]),
  propertyTypeId: z.number().optional(),
  images: z.array(CreateImageSchema).optional(),
  location: LocationSchema.optional(),
});

export const AddImagesSchema = z.object({
  images: z.array(CreateImageSchema),
});
