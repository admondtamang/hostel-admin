export interface IStudentInput {
  confirmed: boolean;
  blocked: boolean;
  email: string;
  username: string;
  password: string;
  Full_Name: string;
  Mobile?: string;
  dob: string;
  role: number;
  province: number;
  institution: number;
  district: number;
}

export interface IUser {
  id: number;
  confirmed: boolean;
  blocked: boolean;
  email: string;
  username: string;
  password: string;
  Full_Name: string;
  Mobile?: string;
  dob: string;
  role: number;
  province: number;
  institution: number;
  district: number;
}

export interface IUserResponse {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  Mobile: string;
  dob: string;
  Full_Name: string;
  role: Role;
  Document?: any;
  province: Province;
  district: District;
  institution: Institution;
  createdBy: CreatedBy;
  updatedBy: CreatedBy;
}

interface CreatedBy {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
}

interface Institution {
  id: number;
  institution_name: string;
  createdAt: string;
  updatedAt: string;
}

interface Province {
  id: number;
  Province: string;
  createdAt: string;
  updatedAt: string;
}

interface District {
  id: number;
  District_name: string;
  createdAt: string;
  updatedAt: string;
}

interface Role {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}
export interface IUserContext {
  user: IUser;
  setUser: (data: any) => {};
}
