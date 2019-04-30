import restify from "restify";
import DBConnection from "./config/database";
import { Router } from "./src/Routes/Router";

/**
 * Create server
 */
const server = restify.createServer();

/**
 * Configure server parser
 */
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());

/**
 * Call database connection
 */
DBConnection();

/**
 * Call routers
 * Server is taken from created server
 * 
 * @param {*} server
 */
Router.all(server);

/**
 * Starting server
 */
server.listen(3000, () => {
    console.log("Server started on port 3000");
});