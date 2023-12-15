const mongoose = require("mongoose");
const { Schema } = mongoose;

//validations https://mongoosejs.com/docs/validation.html
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  cart: [{ type: Schema.Types.ObjectId, ref: "Product" }],    //this objectID will be product id,add cart:["product_id"] in db
  email: { type: String, unique: true },
  password: String,
  token: String,
});

exports.User = mongoose.model("User", userSchema); //model(Product) is always singular
