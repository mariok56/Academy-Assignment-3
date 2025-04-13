export interface GenerateTokenParams {
  email: string;
  password: string;
  expiresIn: number;
}

export interface ApiHeaders {
  authorization: string;
}
