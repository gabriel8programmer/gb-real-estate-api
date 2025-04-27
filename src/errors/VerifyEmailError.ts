export class VerifyEmailError extends Error {
  status: number;
  html: string;
  constructor(status: number, html: string) {
    super();
    this.status = status;
    this.html = html;
  }
}
