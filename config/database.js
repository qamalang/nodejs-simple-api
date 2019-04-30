import mongoose from "mongoose";

module.exports = () => {
    /**
     * Attempt to establish database connection
     */
    mongoose.connect("mongodb://localhost:27017/node-jwt-auth", {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => {
        console.log("Connection established successfully.");
    }).catch(error => {
        console.log("An error occurred while establishing database connection.");
        throw error;
    });
};