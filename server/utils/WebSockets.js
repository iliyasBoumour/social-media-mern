const Conversation = require("../models/Conversation");
const User = require("../models/User");
class WebSockets {
  users = [];
  connection = (socket) => {
    socket.on("disconnect", async () => {
      this.users = this.users.filter((user) => user.socketId !== socket.id);
    });
    socket.on("identity", async (user) => {
      this.users.push({
        socketId: socket.id,
        userId: user,
      });
      console.log(this.users);
      let friends = await User.findOne({ _id: user }, { _id: 0, followers: 1 });
      friends = friends.followers?.map((friend) => friend.userId);
      const toSend = this.users.filter((user) => friends.includes(user.userId));
      console.log(toSend);

      toSend.forEach((element) => {
        global.io.to(element.socketId).emit("loggedIn", user);
      });
    });
    socket.on("message", (message) => {
      const toSend = this.users.find(
        (user) => user.userId === message.receiver
      );
      if (toSend) {
        global.io.to(toSend.socketId).emit("message", { message });
      }
    });

    socket.on("logout", async (user) => {
      this.users = this.users.filter((user) => user.socketId !== socket.id);
      let friends = await User.findOne({ _id: user }, { _id: 0, followers: 1 });
      friends = friends.followers?.map((friend) => friend.userId);
      const toSend = this.users.filter((user) => friends.includes(user.userId));

      toSend.forEach((element) => {
        global.io.to(element.socketId).emit("logout", user);
      });
    });
  };
}

module.exports = new WebSockets();
