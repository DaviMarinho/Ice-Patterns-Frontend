export type SignInCredentials = {
  email: string;
  password: string;
};

export type SignedUser = {
  token: string;
  name: string;
  email: string;
  expireIn: string;
  username: string;
  id?: string;
};

export interface GetUserInfoResponse {
  username: string;
  email: string;
  userId: string;
}

export interface User {
  name: string;
  email: string;
  expireIn: string;
  token: string;
  username: string;
  id?: string;
  xpData?: any;
}

export type AuthResponse = {
  token: string;
  name: string;
  email: string;
  expireIn: string;
  username: string;
  id?: string;
  temporaryPassword: boolean;
};
