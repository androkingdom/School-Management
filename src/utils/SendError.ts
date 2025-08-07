type SendErrorOptions = {
  status: number;
  message: string;
  success?: boolean;
  code?: string;
  error?: any[];
  stack?: string;
};

export class SendError extends Error {
  status: number;
  code?: string;
  success: boolean;
  stack?: string | undefined;
  error?: any[];
  constructor({ status, code, message, stack, error }: SendErrorOptions) {
    super(message);
    this.status = status;
    this.success = false;
    this.code = code;
    this.stack = stack || new Error().stack;
    this.error = error;

    // Optional if you want more consistent trace:
    Error.captureStackTrace?.(this, this.constructor);
  }

  static badRequest(message: string) {
    return new SendError({ status: 400, code: "BAD_REQUEST", message });
  }

  static custom({ status, code, message }: SendErrorOptions) {
    return new SendError({ status, code, message });
  }
}
