//require the express module
const express = require("express");
var cors = require('cors')
const app = express();
const bodyParser = require("body-parser");
const chatRouter = require("./route/chatroute");
const loginRouter = require("./route/loginRoute");
const userDetailsRouter = require("./route/userDetailsRoute");
app.use(cors());
//require the http module
const server = require("http").Server(app);

// require the socket.io module
const io = require("socket.io")(server);
// const Server = require('socket.io');
const port = 5000;

//bodyparser middleware
app.use(bodyParser.json());

//routes
app.use("/chats", chatRouter);
app.use("/login", loginRouter);
app.use("/user/details", userDetailsRouter);

//integrating socketio
// socket = io(http);

//database connection
const Chat = require("./models/Chat");
const connect = require("./dbconnect");

//setup event listener
io.sockets.on("connection", function (socket) {
  console.log("user connected", socket.id);
  socket.join(socket.id);
  socket.on("disconnect", function () {
    console.log("user disconnected");
  });

  //Someone is typing
  socket.on("typing", data => {
    socket.broadcast.emit("notifyTyping", {
      user: data.user,
      message: data.message
    });
  });

  //when soemone stops typing
  socket.on("stopTyping", () => {
    socket.broadcast.emit("notifyStopTyping");
  });

  socket.on("chat message", function (chatDetail) {
    console.log("message: " + chatDetail);
    //broadcast message to everyone in port:5000 except yourself.
    console.log(socket.id)
    // socket.broadcast.emit('received', { message: chatDetail.message });
    // socket.broadcast.to(chatDetail.receiver_id)
    socket.broadcast.to(chatDetail.receiver_id).emit("received", { message: chatDetail.message });

    //save chat to the database
    connect.then(db => {
      console.log("connected correctly to the server");
      let chatMessage = new Chat({ message: chatDetail.message, sender_name: chatDetail.sender_name, sender_id: chatDetail.sender_id, receiver_name: chatDetail.receiver_name, receiver_id: chatDetail.receiver_id });
      chatMessage.save();
    });
  });
});

server.listen(port, () => {
  console.log("Running on Port: " + port);
});
