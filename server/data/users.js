const bcrypt = require("bcryptjs");

const users = [
  {
    username: "Hamza Sajid",
    email: "sajid@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    bio: "Hello World!",
  },
  {
    username: "Iliyas Boumour",
    email: "boumour@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    bio: "Hello World!",
  },
  {
    username: "Brahim Lqati",
    email: "lqati@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    bio: "Hello World!",
  },
  {
    username: "Abderrahmane Bouzzit",
    email: "bouzzit@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    bio: "Hello World!",
  },
];

module.exports = users;
