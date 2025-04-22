import { Property } from "@prisma/client";

// property types
export interface PropertyTypesRepository {
  find: () => Promise<PropertyType[]>;
  create: (params: { name: string }) => Promise<PropertyType>;
  updateNameById: (id: number, name: string) => Promise<PropertyType | null>;
  deleteById: (id: number) => Promise<PropertyType>;
}

// property's interfaces

export interface PropertyImage {
  url: string;
}

export interface PropertyLocation {
  street?: string;
  number?: string;
  complement?: string;
  city?: string;
  state?: string;
  country?: string;
  cep?: string;
  coords?: {
    lat: number;
    lng: number;
  };
}

export interface PropertyWhereParams {
  page?: number;
  pageSize?: number;
  type?: string;
  price?: number;
  //   location?: PropertyLocation;
  orderBy?: "title" | "price" | "createdAt";
  order?: "asc" | "desc";
}

export interface CreatePropertyParams {
  title: string;
  description?: string;
  price: number;
  size?: number;
  bedrooms?: number;
  bathrooms?: number;
  status: "Available" | "Rented" | "Under_maintenance";
  propertyTypeId?: number;
  // location
  location?: PropertyLocation;
}

export interface PropertiesRepository {
  find: (where: PropertyWhereParams) => Promise<Property[]>;
  findById: (id: number) => Promise<Property | null>;
  count: (where: PropertyWhereParams) => Promise<number>;
  create: (params: CreatePropertyParams) => Promise<Property>;
  updateById: (
    id: number,
    params: Partial<Omit<CreatePropertyParams, "images" | "location">>
  ) => Promise<Property | null>;
  deleteById: (id: number) => Promise<Property>;
  addImage: (propertyId: number, url: string) => Promise<void>;
  removeImage: (propertyId: number, imageId: number) => Promise<void>;
}
