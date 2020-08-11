export class HttpError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
  }

  toJSON() {
    return {
      error: this.constructor.name,
      status: this.status,
      message: this.message,
    };
  }
}
