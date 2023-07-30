const express = require('express');
const authController = require('../controllers/auth');
const authRouter = express.Router();

authRouter
    .post("/auth", authController.createUser)
    .post("/login", authController.login);

exports.authRouter = authRouter; 