const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const http = require("http");
require("dotenv").config()
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
app.get("/users", (req, res) => {
  console.log("i was here");
  res.send(users);
});

io.on("connection", (socket) => {
  socket.on("join", (data) => {
    joinUser(socket, data.name, users);
    io.emit("userJoined", users);
  });
  socket.on("sendMessage", (data) => {
    socket.broadcast.emit("receiveMessage", data);
  });
  socket.on("leave", (data) => {
    users = removeUser(socket.id, users);
    // we need to create user left message
    io.emit("userLeft", users);
  });
  socket.on("disconnect", () => {
    users = removeUser(socket.id, users);
  });
});
server.listen(4000, () => {
  console.log("Server is running on port 4000");
});

///DATABASE CONNECTION
const DB = process.env.DATABASE;
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database ------'));

const messageRouter = require('./routes/Messages')
app.use('/message',messageRouter)

const roomRouter = require('./routes/Rooms')
app.use('/room',roomRouter)