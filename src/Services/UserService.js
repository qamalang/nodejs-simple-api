import UserModel from "../Models/UserModel";
import { Token } from "../Helpers/Token";
import { LoginFailedException } from "../Exceptions/LoginFailedException";
import { UploadService } from "./../Services/UploadService";
import { ValidationException } from "../Exceptions/ValidationException";

export class UserService {

    /**
     * Store data to DB
     * 
     * @param {object} data
     */
    static async store(data) {
        const existingUser = await UserModel.findOne({username: data.username});

        if (existingUser !== null) {
            throw new ValidationException("Username is already taken, please use another one!");
        }

        const user = await UserModel.create(data);

        /**
         * Update token
         */
        const token = new Token().generate({
            _id: user._id,
            name: user.name,
            username: user.username
        });

        user.token = token;
        user.save();

        return {
            token: token,
            name: user.name,
            username: user.username
        };
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

            return {
                token: token,
                name: user.name,
                username: user.username
            };
        } else {
            throw new LoginFailedException("Akun tidak ditemukan!");
        }
    }

    async update(user_id, data, profile_picture = null) {
        if (profile_picture !== null) {
            data.profile_picture = await new UploadService(profile_picture).upload();
        }

        const user = await UserModel.findByIdAndUpdate(user_id, {
            $set: data
        }, {
            new: true
        }).select("-__v -token -password -createdAt -updatedAt");

        return user;
    }
};