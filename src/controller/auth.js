const model = require("../model/user");
const jwt = require("jsonwebtoken");
const User = model.User;
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const token = jwt.sign({ email: req.body.email }, "shhhhh"); //generating a token using email
    const hash = bcrypt.hashSync(req.body.password, 10); //hashing the password saltRounds = 10
    const user = new User(req.body);
    user.token = token;
    user.password = hash;
    const resp = await user.save();
    res.status(201).json(resp);
  } catch (error) {
    res.status(400).json(error);
    console.log("error");
  }
};

exports.loginUser = async (req, res) => {
  try {
    const userResp = await User.findOne({ email: req.body.email });
    const isAuth = bcrypt.compareSync(req.body.password, userResp?.password); //userResp?.password contains the hash
    if (isAuth) {
      const token = jwt.sign({ email: req.body.email }, "shhhhh"); //generating a new token using email
      userResp.token=token
      const finalResponse = await userResp.save();
      res.status(201).json({token});
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.status(401).json(error);
    console.log("error",error);
  }
};
