export class LoginFailedException extends Error {

    /**
     * LoginFailedException constructor
     * 
     * @param {*} message 
     */
    constructor(message) {
        super(message);
        this.message = message;
        Error.captureStackTrace(this, this.constructor);
    }
}