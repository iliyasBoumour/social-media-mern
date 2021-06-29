const WebSockets = require('./WebSockets');

const notifyUser = (event, userId, dataTosend) => {
  const users = WebSockets.users.filter((user) => {
    return user.userId.toString() === userId.toString();
  });
  users.forEach((item) => {
    global.io.to(item.socketId).emit(event, dataTosend);
  });
};

const notifyPost = (event, dataToSend) => {
  global.io.emit(event, dataToSend);
};

module.exports = {
  notifyPost,
  notifyUser,
};
