export type SignInCredentials = {
  identifier: string;
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

export type AuthResponse = {
  token: string;
  name: string;
  email: string;
  expireIn: string;
  username: string;
  id?: string;
  temporaryPassword: boolean;
};
