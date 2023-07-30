const express = require("express");
const postController = require("../controllers/posts");
const postRouter = express.Router()

postRouter
  .get("/posts", postController.getAllPosts)
  .get("/posts/:id", postController.getPost)
  .post("/posts", postController.createPost)
  .put("/posts/:id", postController.editPost)
  .patch("/posts/:id", postController.editPostByField)
  .delete("/posts/:id", postController.deletePost);

exports.postRouter = postRouter;