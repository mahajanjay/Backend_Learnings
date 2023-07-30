const express = require("express");
const userController = require("../controllers/user");
const userRouter = express.Router();

userRouter
  .get("/users", userController.getAllUsers)
  .get("/users/:id", userController.getUser)
  .put("/users/:id", userController.editUser)
  .patch("/users/:id", userController.editUserByField)
  .delete("/users/:id", userController.deleteUser);

exports.userRouter = userRouter;