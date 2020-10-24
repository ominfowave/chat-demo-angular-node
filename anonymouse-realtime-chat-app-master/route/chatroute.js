const express = require("express");
const bodyParser = require("body-parser");
const connectdb = require("./../dbconnect");
const Chats = require("./../models/Chat");

const router = express.Router();
router.use(bodyParser.urlencoded({ extended: true }))
router.post("/", function (req, res, next) {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  connectdb.then(db => {
    Chats.find({
      $or: [
        { $and: [{ sender_id: req.body.sender_id }, { receiver_id: req.body.receiver_id }] },
        { $and: [{ sender_id: req.body.receiver_id }, { receiver_id: req.body.sender_id }] }
      ]
    }).then(chat => {
      return res.json(chat);
    });
  });
});

module.exports = router;
