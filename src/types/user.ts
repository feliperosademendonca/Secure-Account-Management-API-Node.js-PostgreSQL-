export interface User {
  id: number;
  indicationId: string;
  publicId: string
  name: string;
  phone: string;
  password: string;
  email?: string | null;
  pixKey?: string | null;
  cpf?: string | null;
  createdAt: Date
  recoveryTokenHash?:string,
  recoveryTokenExpiresAt?: string,
  roles?: string [],
  
}

export interface CreateUserInput {
  indicationId: string;
  name: string;
  phone: string;
  email?: string | null;
  password: string;
  pixKey?: string | null;
  cpf?: string | null;
}

 