import { UserController } from "./../controllers/UserController";

export class UserRoute {

    /**
     * Router
     * 
     * @param {*} server 
     */
    static router (server) {
        server.post("/register", UserController.store); // Register route
        server.post("/login", UserController.login); // Login route   
    }
}