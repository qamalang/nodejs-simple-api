import UserModel from "./../models/UserModel";
import { Token } from "./../helpers/Token";
import { LoginFailedException } from "./../exceptions/LoginFailedException";

export class UserService {

    /**
     * Store data to DB
     * 
     * @param {object} data
     */
    static async store(data) {
        return await UserModel.create(data);
    }

    /**
     * Login user
     * 
     * @param {string} username 
     * @param {string} password 
     */
    static async login(username, password) {
        /**
         * Fetch user data
         */
        const user = await UserModel.findOne({
            username, password
        }).select("_id name username");

        /**
         * Validate user
         */
        if (user !== null) {
            /**
             * Get token
             */
            const token = new Token().generate(user.toJSON());

            /**
             * Update token
             */
            user.token = token;
            user.save();

            return token;
        } else {
            throw new LoginFailedException("Akun tidak ditemukan!");
        }
    }
};