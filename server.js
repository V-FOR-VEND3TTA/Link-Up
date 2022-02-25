// Allows us access to files
const path = require("path");

// For use by Express under the hood 
const http = require("http"); 

// Allows us to use Express.js framework
const express = require("express");

// To allow us to have the functionalities of input and output across pages
const socketio = require('socket.io');

// How we format messages
const formatMessage = require('./utils/messages');

// User functionality 
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users')

// A constant that would be convenient to use
const app = express();

// Explicitly stating that we are using the Express server
const server = http.createServer(app);

const io = socketio(server);

// Set the static folder that Node will look for as program files
app.use(express.static(path.join(__dirname, "public")));

// The bot that sends the welcome message
const botName = 'Cassandra Bot';

// Runs when the client connects
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    socket.join(user.room);
    // Welcome current user
    socket.emit('message', formatMessage(botName, 'Welcome to LinkUp!'));

    // Broadcast when user connects
    socket.broadcast.to(user.room).emit('message', formatMessage(botName, `${user.username} has joined the chat`));
    
    // Send users room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
   
  });

  // Listen for chatMessage
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);
    // We want this message to be displayed to everyone in the room
    io.to(user.room).emit('message', formatMessage(user.username, msg))
  });

  // When the client disconnects
  socket.on('disconnect', () => {
    // To identify which user left
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`));

       // Send users room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
    });
    } 
  });     
});

     
    
/*
      // Send users and room info
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
*/

// Use the port 3000 or the environment variable
const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log(`Server running in port ${PORT}`));
