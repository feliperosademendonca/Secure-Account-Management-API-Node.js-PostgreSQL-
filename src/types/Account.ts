//./src/types/Account.ts


export interface Account {
  id: string;          // UUID da conta
  userId: number;      // FK para users.id
  currency: string;    // Ex.: 'BRL'
  createdAt: Date;
}



export interface CreateAccountInput {
  userId: number;      // FK para users.id
  currency?: string;   // padrão 'BRL'
}


 