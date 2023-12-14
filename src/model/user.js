const mongoose = require("mongoose");
const { Schema } = mongoose;

//validations https://mongoosejs.com/docs/validation.html
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  token: String,
});

exports.User = mongoose.model("User", userSchema); //model(Product) is always singular
