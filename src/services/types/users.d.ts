export interface UsersPaginated {
  page?: number;
  pageSize?: number;
  name?: string;
  email?: string;
  role?: "ADMIN" | "AGENT" | "CLIENT";
  orderBy?: "name" | "email" | "createdAt";
  order?: "asc" | "desc";
  verifiedEmail?: boolean;
  enabled?: boolean;
  createdAt?: Date;
}

export interface CreateUserParams {
  name: string;
  email: string;
  password?: string;
  role?: "ADMIN" | "AGENT" | "CLIENT";
}
