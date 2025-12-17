// src/types/bodies.ts

export interface SignUpBody {
  phone: string;
  name: string;
  email?: string;
  password: string;
  confirmPassword: string;
  indicationId: string;
}

export interface LoginBody {
  phone: string;
  password: string;
}

export interface UpdateBody {
   name?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}


export interface recoveryBody {
   phone: string;
 }

