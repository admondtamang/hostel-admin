export interface IAdminLogin {
  token: string;
  user: User;
}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  username?: any;
  email: string;
  isActive: boolean;
  blocked: boolean;
  preferedLanguage?: any;
  createdAt: string;
  updatedAt: string;
}
