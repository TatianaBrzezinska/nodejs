export interface PaginatedResult<T, L, Y> {
  page: Y;
  totalPages: L;
  pageSize: number;
  totalItems: number;
  items: T[];
}
