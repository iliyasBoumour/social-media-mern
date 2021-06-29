const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");
const postRoutes = require("./routes/api/posts");
const convRoutes = require("./routes/api/conversation.routes");
const msgRoutes = require("./routes/api/message.routes");
const loggedinRoutes = require("./routes/api/loggedin.routes");
const socketio = require("socket.io");
const WebSockets = require("./utils/WebSockets");
const path = require("path");

//middeleware
const auth = require("./middleware/auth");
const app = express();

dotenv.config();
connectDB();

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//use routes api
app.use("/api/users", require("./routes/api/authentification"));
app.use("/api/users", require("./routes/api/follows"));
app.use("/api/users", require("./routes/api/users"));
//notifications
app.use("/api/notifications", require("./routes/api/notifications"));

app.use("/api/posts", postRoutes);

app.use("/conversations", convRoutes);
app.use("/messages", msgRoutes);
app.use("/loggedin", loggedinRoutes);
app.use(errorHandler);

const __direname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__direname, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(__dirname, "..", "client", "build", "index.html")
    );
  });
}

const server = app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});
/** Create socket connection */
global.io = socketio(server);
global.io.on("connection", WebSockets.connection);
