import jwt from "jsonwebtoken";
import {ResponseBuilder} from "./../Helpers/ResponseBuilder";

export default (req, res, next) => {
    try {

        /**
         * Verify token
         */
        jwt.verify(req.headers.token, "terangbulanmanis", (err, decoded) => {
            if (decoded) {
                req.credential = decoded;
                next();
            } else {
                res.status(401);
                res.json(ResponseBuilder.error("Unauthorized!", ["Invalid token"], 4));
            }
        });
    } catch (exception) {
        res.status(500);
        res.json(exception.message);
    }
}