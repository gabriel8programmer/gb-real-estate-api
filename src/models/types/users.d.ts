export interface UserWhereParams {
  page?: number;
  pageSize?: number;
  name?: {
    contains?: string;
    equals?: string;
  };
  email?: {
    contains?: string;
    equals?: string;
  };
  role?: "ADMIN" | "AGENT" | "CLIENT";
  emailVerified?: boolean;
  enabled?: boolean;
  createdAt?: Date;
  orderBy?: "name" | "email" | "createdAt";
  order?: "asc" | "desc";
}

export interface CreateUserParams {
  name: string;
  email: string;
  password?: string;
  role?: "ADMIN" | "AGENT" | "CLIENT";
  emailVerified?: boolean;
  enabled?: boolean;
}

export interface UsersRepository {
  find: (where: UsersWhereParams) => Promise<User[]>;
  findById: (id: number) => Promise<User | null>;
  count: (where: UserWhereParams) => Promise<number>;
  create: (params: CreateUserParams) => Promise<User>;
  updateById: (id: number, params: Partial<CreateUserParams>) => Promise<User | null>;
  deleteById: (id: number) => Promise<User | null>;
}
