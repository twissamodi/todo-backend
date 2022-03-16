/* eslint-disable max-classes-per-file */
class InputError extends Error {
  constructor(name, httpCode, errors) {
    super();
    this.name = name;
    this.httpCode = httpCode;
    this.errors = errors;
  }
}
class NotFoundError extends Error {
  constructor(name, message, httpCode) {
    super(message);
    this.name = name;
    this.httpCode = httpCode;
  }
}
module.exports = {
  InputError,
  NotFoundError,
};
