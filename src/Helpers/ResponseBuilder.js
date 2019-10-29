export class ResponseBuilder {

    /**
     * Success response builder
     * 
     * @param {*} message 
     * @param {*} data 
     */
    static success(message, data) {
        return {
            success: true,
            message,
            data
        };
    }

    /**
     * Error response builder
     * 
     * @param {*} message 
     * @param {*} errors 
     * @param {*} error_code 
     */
    static error(message, errors = [], error_code = 5) {
        return {
            success: false,
            message,
            error_code: error_code,
            errors: errors,
        };
    }
}