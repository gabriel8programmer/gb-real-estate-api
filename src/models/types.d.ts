import { Client, Location, Property, PropertyType, User } from "@prisma/client";

// user's interfaces

export interface CreateUserParams {
  name: string;
  email: string;
  password?: string;
  role?: "ADMIN" | "AGENT" | "CLIENT";
  emailVerified?: boolean;
  enabled?: boolean;
}

export interface UsersRepository {
  find: () => Promise<User[]>;
  findById: (id: number) => Promise<User | null>;
  create: (params: CreateUserParams) => Promise<User>;
  updateById: (id: number, params: Partial<CreateUserParams>) => Promise<User | null>;
  deleteById: (id: number) => Promise<User | null>;
}

// client's interfaces

export type MaterialStatus =
  | "Single"
  | "Married"
  | "Divorced"
  | "Widowed"
  | "Separated"
  | "Engaged";

export interface CreateClientParams {
  birthDate: Date;
  phone: string;
  cpf: string;
  rg?: string;
  materialStatus?: MaterialStatus;
  gender?: "MALE" | "FEMALE";
  userId: number;
}

export interface ClientsRepository {
  findById: (id: number) => Promise<Client | null>;
  create: (params: CreateClientParams) => Promise<Client>;
  updateById: (id: number, params: Partial<CreateClientParams>) => Promise<Client | null>;
  deleteById: (id: number) => Promise<Client | null>;
}

// property's type interfaces

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

export interface CreatePropertyParams {
  title: string;
  description?: string;
  price: number;
  size?: number;
  bedrooms?: number;
  bathrooms?: number;
  status: "Available" | "Rented" | "Under_maintenance";
  propertyTypeId?: number;
  // images's list
  images?: propertyImage[];
  // location
  location?: PropertyLocation;
}

export interface PropertiesRepository {
  find: () => Promise<Property[]>;
  findById: (id: number) => Promise<Property | null>;
  create: (params: CreatePropertyParams) => Promise<Property>;
  updateById: (
    id: number,
    params: Partial<Omit<CreatePropertyParams, "images" | "location">>
  ) => Promise<Property | null>;
  deleteById: (id: number) => Promise<Property>;
  addImages: (propertyId: number, images: propertyImage[]) => Promise<void>;
  removeImages: (propertyId: number, imageIds: number[]) => Promise<void>;
  updateLocation: (propertyId: number, location: PropertyLocation) => Promise<Location | null>;
}
