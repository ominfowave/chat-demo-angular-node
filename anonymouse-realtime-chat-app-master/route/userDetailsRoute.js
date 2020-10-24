const express = require("express");
const bodyParser = require("body-parser");
const connectdb = require("./../dbconnect");
const Users = require("./../models/User");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }))
router.post("/", function (req, res, next) {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    connectdb.then(db => {
        Users.find({ _id: { $ne: req.body.logged_user_socket_id } }).then(chat => {
            console.log(chat)
            return res.json(chat);
        });
    });
});

module.exports = router;
