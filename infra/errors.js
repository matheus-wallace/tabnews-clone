export class InternalServerError extends Error {
  constructor({ cause }) {
    super("Um erro interno não esperado aconteceu", {
      cause,
    });
    this.name = "InternalServerError";
    this.action = "Entre em contato com o suporte";
    this.status = 500;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status: this.status,
    };
  }
}