var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var postSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    message: String,
    date: Date
});

module.exports = mongoose.model("posts", postSchema);