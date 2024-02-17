export interface UserI {
  email?: string;
  name?: string;
}

export interface AccessTokenI extends UserI {
  email?: string;
  name?: string;
}

export interface AuthI {
  user?: UserI;
  isUserAuthenticated?: boolean;
}

export interface AuthContextI {
  auth: AuthI;
  setAuth: (access_token: string, refresh_token?: string) => void;
}
