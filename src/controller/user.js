const fs = require("fs");
const model = require("../model/user");
const User = model.User;
// const jwt = require("jsonwebtoken");         //commented as user will not be able to login signup

// exports.createUser = async (req, res) => {
//   try {
//     const token = jwt.sign({ email: req.body.email }, "shhhhh"); //generating a token using email
//     const user = new User(req.body);
//     user.token = token;
//     const resp = await user.save();
//     res.status(201).json(resp);
//   } catch (error) {
//     res.status(400).json(error);
//     console.log("error");
//   }
// };

exports.getAllUsers = async (req, res) => {
  try {
    const userResp = await User.find().populate("cart"); //it will all data related to product id
    // const userResp = await User.find();
    res.status(201).json(userResp);
  } catch (error) {
    res.status(400).json(error);
    console.log("error");
  }
};

exports.getSingleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userResp = await User.findById(id);
    res.status(201).json(userResp);
  } catch (error) {
    res.status(400).json(error);
    console.log("error");
  }
};

exports.updatePUTUser = async (req, res) => {
  try {
    const id = req.params.id;
    const resp = await User.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(resp);
  } catch (error) {
    res.status(400).json(error);
    console.log("error", error);
  }
};
exports.updatePATCHUser = async (req, res) => {
  try {
    const id = req.params.id;
    const resp = await User.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(resp);
  } catch (error) {
    console.log("error", error);
    res.status(400).json(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const resp = await User.findOneAndDelete({ _id: id });
    res.status(201).json(resp);
  } catch (error) {
    console.log("error", error);
    res.status(400).json(error);
  }
};
