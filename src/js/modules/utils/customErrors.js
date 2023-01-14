/* eslint-disable import/prefer-default-export */
export class InputError extends Error {
  constructor(message) {
    super(message);
    this.name = InputError;
  }
}
