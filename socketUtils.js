const addUser = (socket, name, users) => {
  if (!users.some((user) => user.name === name)) {
    users.push({ name, id: socket.id });
    return true;
  }
};
const checkUser = (name, users) => {
  return users.some((user) => user.name === name);
};

exports.joinUser = (socket, name, users) => {
  if (checkUser(name, users)) {
    socket.emit("error", "User already exists");
  }
  if (!name) {
    socket.emit("error", "Please enter a name");
  } else {
    addUser(socket, name, users);
    console.log(users);
  }
};

exports.removeUser = (socketId, users) => {
  return users.filter((user) => user.id !== socketId);
};
