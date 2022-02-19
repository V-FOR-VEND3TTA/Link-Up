// For use by Express under the hood 
const http = require("http"); 

// Allows us access to files
const path = require("path");

// Allows us to use Express.js framework
const express = require("express");

const app = express();
// Would allow 
//const socketio = require("socket.io");

//const formatMessage = require("./utils/messages");

//const {
/*  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");
*/

//const server = http.createServer(app);
//const io = socketio(server);

// Set the static folder that Node will look for as program files
app.use(express.static(path.join(__dirname, "public")));

// The thing that sends the welcome message
//const botName = "Admin";

// Run when the client connects
/*io.on("connection", (socket) => {
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);

    // Welcome the user
    socket.emit("message", formatMessage(botName, "Welcome to LinkUp!"));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(botName, `${user.username} has joined the chat`)
      );
    // Send users room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // Listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    // We want the message sent to be displayed to everybody
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Runs when a client disconnects
  socket.on("disconnect", () => {
    // To identify which user left
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        "message",
        formatMessage(botName, `${user.username} has left the chat`)
      );

      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});
*/
// Use the port 3000 or the environment variable
const PORT = 3000 || process.env.PORT;

app.listen(PORT, () => console.log(`Server running in port ${PORT}`));
