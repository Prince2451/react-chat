const { createServer } = require("http");
const express = require("express");
const cors = require("cors");
const socketIo = require("socket.io");
require("dotenv").config();

const app = express();

const httpServer = createServer(app);

app.use(cors());
app.use(express.json());
const io = socketIo(httpServer, {
  cors: {
    origin: process.env.FRONTEND_DOMAIN,
    method: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join-room", (username) => {});
  socket.on("send-message", (senderUsername, message, receiverUsername) => {
    socket.broadcast.emit(
      `${receiverUsername}/new-message`,
      senderUsername,
      message
    );
  });
});

httpServer.listen(4000);
