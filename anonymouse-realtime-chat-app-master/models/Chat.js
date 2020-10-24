const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    message: {
      type: String
    },
    sender_name: {
      type: String
    },
    receiver_name: {
      type: String
    },
    sender_id: {
      type: String
    },
    receiver_id: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

let Chat = mongoose.model("chat", chatSchema);

module.exports = Chat;
