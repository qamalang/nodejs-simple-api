import { UserRoute } from "./UserRoute";

export class Router {
    
    /**
     * Router
     * 
     * @param {*} server 
     */
    static all (server) {
        UserRoute.router(server);
    }
}