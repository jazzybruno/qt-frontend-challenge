import { IUser } from "./user.type";

export interface IRole extends IModel {
  name : string
}
export interface IModel {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  deletedAt: Date | string | null;
}

export interface ApiResponse<T = any> {
  payload: T;
  success: boolean;
  message: string;
  status: number;
}

export interface IPagination<T = any[]> {
  content: T;
  pagination : IPagination
}

export interface IPagination  {
  totalRecords : number,
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
}

export interface IPaginatedQuery {
  limit?: number;
  page?: number;
}

