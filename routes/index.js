const todos = require("./todos");
const users = require("./users");

module.exports = (app) => {
  app.use("/todos", todos), app.use("/users", users);
};
