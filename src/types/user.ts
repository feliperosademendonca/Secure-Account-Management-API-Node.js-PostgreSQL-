export interface User {
  id: number;
  indicationId: string;
  name: string;
  phone: string;
  password: string;
  email?: string | null;
  pixKey?: string | null;
  cpf?: string | null;
}
