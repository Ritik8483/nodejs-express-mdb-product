const mongoose = require("mongoose");
const { Schema } = mongoose;

//validations https://mongoosejs.com/docs/validation.html
const roomsSchema = new Schema({
  roomName: String,
//   peoples: [{ type: Schema.Types.ObjectId, ref: "User" }], //this objectID will be product id,add cart:["product_id"] in db
});

exports.Room = mongoose.model("room", roomsSchema); //model(Product) is always singular
