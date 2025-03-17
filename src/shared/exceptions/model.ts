import { StatusCode } from "../constant";

export class ApplicationException extends Error {
  public code: string;

  constructor(message: string, code: string) {
    super(message);
    this.code = code;
    Object.setPrototypeOf(this, ApplicationException.prototype);
  }
}

export class HttpException extends ApplicationException {
  public status: StatusCode;

  constructor(message: string, code: string, status: StatusCode) {
    super(message, code);
    this.status = status;
    Object.setPrototypeOf(this, HttpException.prototype);
  }
}
