export interface DupErrorType extends Error {
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
