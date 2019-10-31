export class ValidationException extends Error {

    /**
     * ValidationException constructor
     * 
     * @param {*} message 
     */
    constructor(message) {
        super(message);
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}