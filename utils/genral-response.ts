// TODO => use this for GeneralResponse for actions
export type ApiResponse<T> =
  | {
      success: false;
      statusCode?: number | undefined;
      error: { message: string };
    }
  | {
      success: true;
      data: T;
    };
