export type ResponseType<T> =
  | {
      responseCode: string;
      responseDescription: string;
      data: T;
    }
  | { responseCode: string; responseDescription: string; message: string };

export type PaginatedResponse<T> = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  items: T;
};
