const express = require("express");
const roomController = require("../controller/room");
const router = express.Router();

router
  .post("/", roomController.createRooms)
  .get("/", roomController.getAllRooms);

exports.router = router;
