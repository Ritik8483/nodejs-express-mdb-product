const mongoose = require("mongoose");
const { Schema } = mongoose;

//validations https://mongoosejs.com/docs/validation.html
const productsSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  rating: Number,
  brand: String,
  thumbnail: String,
});

exports.Product = mongoose.model("Product", productsSchema); //model(Product) is always singular
