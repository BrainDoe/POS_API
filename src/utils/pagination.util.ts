export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  search?: string;
  order?: "asc" | "desc";
}

export interface ParamsResponse {
  skip: number;
  take: number;
  orderBy: { [x: string]: "asc" | "desc" };
  search: string | undefined;
}

export function getPaginationParams(params: PaginationParams): ParamsResponse {
  const page = Number(params.page) || 1;
  const limit = Number(params.limit) || 10;
  const skip = (page - 1) * limit;
  const sortBy = params.sortBy || "createdAt";
  const order = params.order || "desc";
  const search = params.search || undefined;

  return { skip, take: limit, orderBy: { [sortBy]: order }, search };
}
