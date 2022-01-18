export class BadRequest extends Error {
    constructor(message?: string) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
    }
}
