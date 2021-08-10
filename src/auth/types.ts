export type AuthParams = {
  app_id: string;
  password: string;
};

export type UserAuth = {
  user_id: number;
  id: number;
  app_id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  reserve_amount: number;
};
