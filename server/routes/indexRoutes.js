const express = require("express");
const indexRouter = express.Router();

indexRouter.get("/test", (req, res) => {
  res.json("test ok");
});

indexRouter.use("/auth", require("./authRoutes.js"));

module.exports = indexRouter;
