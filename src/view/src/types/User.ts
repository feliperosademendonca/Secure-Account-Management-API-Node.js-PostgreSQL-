// types/User.ts
export type User = {
  id: number;
  indicationid: string;
  name: string;
  phone: string;
  email: string | null;
};

export type MeResponse = {
  message: string;
  user: User;
};
