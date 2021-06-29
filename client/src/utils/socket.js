import io from "socket.io-client";

const utils = {
  user: localStorage.getItem("currentUserId"),
  socket: localStorage.getItem("currentUserId") ? io() : null,
};

export default utils;
