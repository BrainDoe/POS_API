export interface DupErrorType extends Error {
  statusCode?: any;
  errorResponse: {
    index: number;
    code: number;
    keyPattern: { name: number };
    keyValue: { name: string };
    errmsg: string;
  };
  index: number;
  code: number;
  keyPattern: { name: number };
  keyValue: { name: string };
}
