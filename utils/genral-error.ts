import { Paged } from "types/page";

export const HTTP_RESPONSE_TYPE = {
  OK: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  NOT_ACCEPTABLE: 406,
  CONFLICT: 409,
};

interface GeneralErrorOptions {
  name?: string;
  data?: any;
  statusCode?: number;
  ishandledError?: boolean;
  error?: { message: string };
}
export type ResponseInterface<T> = {
  data?: T;
  error?: { message: string };
};
export type PagedResponseInterface = Paged<{
  error?: { message: string };
}>;

export class ResponseEntity {
  constructor() {}

  ok(data?: any | null) {
    return { success: true, data };
  }

  error(message: string, options?: { isHandledError?: boolean; stasusCode?: number }): { error: { message: string }; success: boolean; statusCode?: number } {
    if (process.env.NODE_ENV == 'production' && !options?.isHandledError) {
      console.log('error', message);
      return { error: { message: 'خطای نامشخص رخ داده است' }, success: false };
    }
    return { error: { message }, success: false, statusCode: options?.stasusCode };
  }
}

export class GeneralError extends Error {
  data?: any;
  errors: { message: string }[] = [];
  private code = 400;
  private isHandledError = false;

  constructor(message: string, options?: GeneralErrorOptions) {
    super();
    this.message = message;
    this.data = options?.data;

    if (options?.name) this.name = options?.name;
    if (options?.statusCode) this.code = options?.statusCode;
    if (options?.ishandledError) this.isHandledError = options?.ishandledError;
    // if (options?.errors) this.errors = options?.errors;
  }

  get statusCode() {
    return this.code;
  }
}

// export function Error(message: string, options?: GeneralErrorOptions) {
//   return { error: { message, detail: process.env.NODE_ENV == 'development' ? options : {} } };
// }
