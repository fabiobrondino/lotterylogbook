export type UserRegister = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  avatar: string;
  gain: number;
  loss: number;
};

export type RequestResetPassword = {
  email: string;
};

export type ResetPassword = {
  token: string;
  password: string;
};

export type Jackpot = {
  reference_date: Date;
  jackpot: number;
};

export type LuckyNumber = {
  number: number;
  star: number;
};

export type Combinations = {
  numbers: string;
  stars: string;
  star_plus: boolean;
  reference_date: Date;
};

export type Result = {
  numbers: string;
  stars: string;
  reference_date: Date;
};
