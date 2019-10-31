import { UserController } from "../Controllers/UserController";
import Authenticate from "./../Middleware/Authenticate";

export class UserRoute {

    /**
     * Router
     * 
     * @param {*} server 
     */
    static router (server) {
        server.get("/", (req, res) => {
            res.json("Server UP!");
        });

        server.post("/register", UserController.store); // Register route
        server.post("/login", UserController.login); // Login route   
        
        server.get("/users", Authenticate, UserController.index);
        server.get("/profile", Authenticate, UserController.profile);
        server.put("/profile", Authenticate, UserController.updateProfile);
    }
}