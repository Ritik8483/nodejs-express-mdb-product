const express = require("express");
const userController = require("../controller/user");
const router = express.Router();

router
.get("/", userController.getAllUsers)
.get("/:id", userController.getSingleUser)
.put("/:id", userController.updatePUTUser)
.patch("/:id", userController.updatePATCHUser)
.delete("/:id", userController.deleteUser);

exports.router = router

//   .post("/", userController.createUser)