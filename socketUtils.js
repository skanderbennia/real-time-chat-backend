const addUser = (socket, name, roomName, users) => {
  if (!users.some((user) => user.name === name)) {
    users.push({ name, id: socket.id, roomName });
    return true;
  }
};

exports.joinUser = (socket, name, roomName, users) => {
  if (!name) {
    socket.emit("error", "Please enter a name");
  } else {
    addUser(socket, name, roomName, users);
  }
};

exports.removeUser = (socketId, users) => {
  return users.filter((user) => user.id !== socketId);
};
