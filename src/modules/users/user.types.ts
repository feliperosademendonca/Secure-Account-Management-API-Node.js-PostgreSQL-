//.src/modules/users/user.types.ts
export interface CreateUserDTO {
  indicationId: string;
  name: string;
  phone: string;
  email?: string | null;
  password: string;
  pixKey?: string | null;
  cpf?: string | null;
}
