const express = require("express");
const server = express();
const productController = require("./controller/product"); //MVC APPROACH OF data.json
const router = express.Router();    //MVC APPROACH OF data.json
const productRouter = require("./routes/product");      //MVC shorthand
const fs = require("fs"); //for crud using data.json
const cors = require("cors");

const mongoose = require("mongoose");           //importing Mongoose
main().catch((err) => console.log("error", err));   //connecting Mongoose

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");    //match id(27017) with db port
  console.log("mongoose connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
server.use(cors()); 
server.use(express.json()); //body parser
server.listen(8080, () => console.log("server started")); //starting server

// ---------------Mongoose API--------------------
server.use("/products", productRouter.router)

//--------------------MVC shorthand with router file--------------------
// server.use("/products", productRouter.router);

// ---------------------MVC APPROACH OF data.json-------------------------
// server.use("/products", router.get("/", productController.getAllProducts));
// server.use("/products", router.get("/:id", productController.getSingleProduct));
// server.use("/products", router.post("/", productController.createProducts));

// ------------------API WITH JSON DATA------------------
// const jsonData = JSON.parse(fs.readFileSync("data.json", "utf-8"));
// const allProducts = jsonData.products;

// server.get("/products", (req, res) => {
//   res.status(201).json(allProducts); //http://localhost:8080/products gives json
// });

// server.get("/products/:id", (req, res) => {
//   const id = +req.params.id; //it will recieve id which we send from POSTMAN
//   res.json(allProducts.find((item) => item.id === id)); //http://localhost:8080/products gives json
// });

// server.post("/products", (req, res) => {
//   allProducts.push(req.body); //need to setup parser to recieve body otherwise it's undefined
//   res.json(req.body);
// });

// server.put("/products/:id", (req, res) => {
//   //it updates whole object,replaces it with new object
//   const id = +req.params.id;
//   const productIndex = allProducts.findIndex((item) => item.id === id);
//   const updatedProduct = allProducts.splice(productIndex, 1, {
//     ...req.body,
//     id: id,
//   });
//   res.status(201).json();
// });

// server.patch("/products/:id", (req, res) => {
//   const id = +req.params.id;
//   const productIndex = allProducts.findIndex((item) => item.id === id);
//   const orignalProduct = allProducts[productIndex];
//   const updatedProduct = allProducts.splice(productIndex, 1, {
//     ...orignalProduct,
//     ...req.body,
//   });
//   res.status(201).json();
// });

// server.delete("/products/:id", (req, res) => {
//   const id = +req.params.id;
//   const productIndex = allProducts.findIndex((item) => item.id === id);
//   allProducts.splice(productIndex, 1);
//   res.status(201).json();
// });

// ------------------CHECKING SERVER ON BROWSER------------------
// server.get("/", (req, res) => {
//   res.status(201).json({ title: "product" });       //checking server with dummy data on localhost
// })

//-----------------INSTRUCTIONS--------------------------
//Install npm i express mongoose dotenv cors
//change scipts with "start":"node index.js","dev":"nodemon index.js"