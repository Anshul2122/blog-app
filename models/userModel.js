const mongooes = require('mongoose');

const userSchema = new mongooes.Schema(
    {
        username: {
            type: String,
            required: [true, "username is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
        },
        password: {
            type: String,
            required: [true, "password is required"],
        },
    },
    { timestamps: true }
);

const userModel = mongooes.model("User", userSchema);

module.exports = userModel;