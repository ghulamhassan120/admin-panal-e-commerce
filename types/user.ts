export interface IUser {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'admin';
}

export interface ILoginResponse {
  message: string;
  user: IUser;
}