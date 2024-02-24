export declare type IPageProps<T = {}> = {
  params: T;
  searchParams: Record<string, string | undefined>;
};

export interface Paged<T> {
  data: T[];
  error: { message: string; detail: any };
  limit: number;
  offset: number;
  hasNextPage: boolean;
  totalCount: number;
}

export interface Paginated<T> {
  data: T[];
  error: { message: string; detail: any };
  page: number;
  pageSize: number;
  totalPages: number;
  total: number;
}

export declare type PagedRequest<T> = T & {
  offset: number;
  limit: number;
};

export declare type SimpleResponse = WithError<{ success?: boolean }>;

export declare type WithError<T> = T & {
  error?: { message: string; detail: any };
};
