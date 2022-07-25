const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const { joinUser, removeUser } = require("./socketUtils");
let users = [];
const app = express();
const server = http.createServer(app);

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

const io = socketio(server, {
  cors: {
    origin: "*",
  },
});

app.get("/rooms", (req, res) => {
  res.json([
    { id: 1, name: "The Second Room" },
    { id: 2, name: "The First Room" },
  ]);
});

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    joinUser(socket, data.name, data.roomName, users);
    socket.join(data.roomName);
    let usersInRoom = users.filter((user) => user.roomName === data.roomName);
    io.to(data.roomName).emit("userJoined", usersInRoom);
  });
  socket.on("sendMessage", (data) => {
    const roomName = users.find((user) => user.id === socket.id).roomName;
    socket.broadcast.to(roomName).emit("receiveMessage", data);
  });
  socket.on("disconnect", () => {
    if (!users.find((user) => user.id === socket.id).roomName) {
      return;
    }
    const roomName = users.find((user) => user.id === socket.id).roomName;
    const usersInRoom = users.filter((user) => user.roomName === roomName);
    users = removeUser(socket.id, users);
    io.to(roomName).emit("userLeft", usersInRoom);
  });
  // io.of("/").adapter.on("join-room", (room, id) => {
  //   console.log(`socket ${id} has joined room ${room}`);
  // });
});
server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
