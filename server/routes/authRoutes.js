const express = require("express");
const authRouter = express.Router();
const {
  registerController,
  profileController,
  loginController,
} = require("../controller/authController");

authRouter.post("/register", registerController);
authRouter.post("/login", loginController);
authRouter.get("/profile", profileController);

module.exports = authRouter;
