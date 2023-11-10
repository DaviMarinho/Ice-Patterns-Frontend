export interface IUser {
  id: string;
  email: string;
  username: string;
  name: string;
}

export interface LoggedUser {
  id: string;
  username: string;
  name: string;
}

export interface RegisterUserPayload {
  username: string;
  email: string;
  name: string;
  password?: string;
  confirmPassword: string;
}

export interface CredentialUser {
  identifier: string;
  password: string;
}

export interface CredentialUserPasswordRecover {
  email: string;
}
