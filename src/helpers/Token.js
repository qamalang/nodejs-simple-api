import jwt from "jsonwebtoken";

export class Token {

    /**
     * Token constructor
     */
    constructor () {
        this._secretKey = "terangbulanmanis";
    }

    /**
     * Generate new token
     * 
     * @param {object} payload 
     */
    generate (payload) {
        /**
         * Generate token
         */
        return jwt.sign(payload, this._secretKey, {
            algorithm: "HS256",
            expiresIn: "1d" // Expires in one day
        });
    }

    verify () {

    }
}