const express = require("express");
const bodyParser = require('body-parser')
const router = express.Router();
const connectdb = require("./../dbconnect");
const Users = require("./../models/User");
router.use(bodyParser.urlencoded({ extended: true }))
router.post("/", function (req, res, next) {
  connectdb.then(db => {
    console.log('EEEEEEEEEEEEEEEEEEEEE',req.body)
    var user = new Users(req.body)
    user.save(function (err, result) {
      if (err) {
        console.log(err)
      }
      if (result) {
        return res.json(result)
      }
    });
    // next();
  });
});

module.exports = router;
