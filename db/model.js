const mongodb = require("mongoose")

const userauth = new mongodb.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

module.exports = mongodb.model("UserAuth2", userauth)
