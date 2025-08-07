type SendResOptions<T = any> = {
  status: number;
  message: string;
  data?: T;
  success?: boolean;
};

export class SendRes<T = any> {
  status: number;
  message: string;
  data?: T;
  success: boolean;
  constructor({ status, message, data }: SendResOptions<T>) {
    this.status = status;
    this.message = message;
    this.data = data;
    this.success = status < 400;
  }

  static ok<T = any>(options: SendResOptions<T>) {
    return new SendRes(options);
  }

  static custom<T = any>(options: SendResOptions<T>) {
    return new SendRes(options);
  }
}
