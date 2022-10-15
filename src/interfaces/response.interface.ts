export interface BaseResponse<T = any> {
  result: boolean;
  data: T | T[];
}

export interface BasicResponse<T = any> extends BaseResponse<T> {
  data: T;
}

export interface RowResponse<T = any> extends BaseResponse<T> {
  count: number;
  data: T[];
}

export interface ErrorResponse {
  result: boolean;
  status: number;
  timestamp: string;
  path: string;
  message: string;
  headers: any;
  requestData: {
    query: any;
    params: any;
    body: any;
  };
}
