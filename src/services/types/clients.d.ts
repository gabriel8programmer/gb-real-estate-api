export type MaterialStatusClient =
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
  materialStatus?: MaterialStatusClient;
  gender?: "MALE" | "FEMALE";
  userId: number;
}
