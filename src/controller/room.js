const fs = require("fs");
const model = require("../model/room");
const Room = model.Room;

exports.createRooms = async (req, res) => {
  try {
    const room = new Room(req.body);
    const resp = await room.save();
    res.status(201).json(resp);
  } catch (error) {
    res.status(400).json(error);
    console.log("error");
  }
};

exports.getAllRooms = async (req, res) => {
  try {
    const productsResp = await Room.find();
    // const productsResp = await Room.find().populate("peoples");
    res.status(201).json(productsResp);
  } catch (error) {
    res.status(400).json(error);
    console.log("error", error);
  }
};
