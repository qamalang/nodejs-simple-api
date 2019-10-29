import { UserService } from "../Services/UserService";
import { ResponseBuilder } from "../Helpers/ResponseBuilder";
import { LoginFailedException } from "../Exceptions/LoginFailedException";

import UserModel from "./../Models/UserModel";

export class UserController {

    /**
     * Store or register new user
     * 
     * @param {*} req 
     * @param {*} res 
     */
    static async store(req, res) {
        try {
            const result = await UserService.store(req.body);
            res.json(ResponseBuilder.success("Successfully registered!", result));
        } catch (exception) {
            res.status(500);
            res.json(ResponseBuilder.error("An erorr occurred", [exception.message], 5));
        }
    }

    /**
     * Login user
     * 
     * @param {*} req 
     * @param {*} res 
     */
    static async login(req, res) {
        try {
            const result = await UserService.login(req.body.username, req.body.password);
            res.json(ResponseBuilder.success("Successfully logged in!", result));
        } catch (exception) {
            if (exception instanceof LoginFailedException) {
                res.status(401);
                res.json(ResponseBuilder.error("Login failed", [exception.message], 0));
            } else {
                console.log(exception);
                res.status(500);
                res.json(ResponseBuilder.error("An erorr occurred", [], 5));
            }
        }
    }

    static async index(req, res) {
        try {
            const result = await UserModel.find().select("_id name username");
            res.json(ResponseBuilder.success("List user", result));
        } catch (exception) {
            console.log(exception);
            res.status(500);
            res.json(ResponseBuilder.error("An erorr occurred", [exception.message], 5));
        }
    }

    static async profile(req, res) {
        try {
            const result = await UserModel.findById(req.credential._id).select("_id name username profile_picture");
            res.json(ResponseBuilder.success("User profile", result));
        } catch (exception) {
            console.log(exception);
            res.status(500);
            res.json(ResponseBuilder.error("An erorr occurred", [exception.message], 5));
        }
    }

    static async updateProfile(req, res) {
        try {
            const result = await new UserService().update(req.credential._id, req.body, req.files.profile_picture);
            res.json(ResponseBuilder.success("Success update profile", result));
        } catch (exception) {
            console.log(exception);
            res.status(500);
            res.json(ResponseBuilder.error("An erorr occurred", [exception.message], 5));
        }
    }
}