const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

const url = "mongodb+srv://chatuser:chatuser@cluster0.lb6a9.mongodb.net/chat_user?retryWrites=true&w=majority";
// mongoose.connect("mongodb+srv://ominfowave:om123456@cluster0-zsmtd.mongodb.net/inrbond-database?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true });

const connect = mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
module.exports = connect;
