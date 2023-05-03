export interface IStudentPaginationResponse {
  results: IStudentData[];
  pagination: Pagination;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface IStudentData {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  Mobile?: string;
  dob: string;
  Full_Name?: string;
  role: Role;
  Document?: Document[];
  province: Province;
  institution: Institution;
  district?: District;
  createdBy: CreatedBy;
  updatedBy: UpdatedBy;
}

interface UpdatedBy {
  id: number;
  firstname: string;
  lastname: string;
  username?: any;
}

interface CreatedBy {
  id: number;
  firstname: string;
  lastname: string;
  username?: string;
}

interface District {
  id: number;
  createdAt: string;
  updatedAt: string;
  District_name: string;
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

interface Document {
  id: number;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: Formats;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl?: any;
  provider: string;
  provider_metadata?: any;
  folderPath: string;
  createdAt: string;
  updatedAt: string;
}

interface Formats {
  small: Small;
  thumbnail: Small;
  large?: Small;
  medium?: Small;
}

interface Small {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path?: any;
  size: number;
  width: number;
  height: number;
}

interface Role {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}
