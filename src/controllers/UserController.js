import { UserService } from "../Services/UserService";
import { ResponseBuilder } from "../Helpers/ResponseBuilder";
import { LoginFailedException } from "../Exceptions/LoginFailedException";

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
            console.log(exception);
            res.json(ResponseBuilder.error("An erorr occurred", [], 5));
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
            res.json(ResponseBuilder.success("Successfully logged in!", {
                token: result
            }));
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
}