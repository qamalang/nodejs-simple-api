import mongoose from "mongoose";

/**
 * Define user schema
 */
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile_picture: String,
    token: String
}, {
    timestamps: true
});

/**
 * Creating model and exports it
 */
module.exports = mongoose.model("users", userSchema);