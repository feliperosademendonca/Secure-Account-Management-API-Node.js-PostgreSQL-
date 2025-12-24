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

/** 🔹 Atualização de dados públicos do perfil */
export interface UpdateProfileBody {
  name?: string;
  phone?: string;
  email?: string;
    password?: string;

}

/** 🔐 Atualização de senha (rota separada) */
export interface UpdatePasswordBody {
  password: string;
  confirmPassword: string;
}

export interface RecoveryBody {
  phone: string;
}
