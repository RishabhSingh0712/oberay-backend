class HttpException extends Error {
  constructor(statusCode, message) {
    super(statusCode, message);
    this.statusCode = statusCode;
    this.message = message;
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = HttpException;
