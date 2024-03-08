const express = require("express");
const server = express();
require("./src/events"); //requiring it because itsn't related to index.js file
const appServerSocket = require("http").createServer(server);
const io = require("socket.io")(appServerSocket, {
  cors: { origin: "http://localhost:3000" },
});

//SOCKET USED IN CHAT IMPLEMENTATION
io.on("connection", (socket) => {
  //Custom Room
  socket.on("join_room", (data) => {
    console.log("join_room", data); //here we recieve data on backend and connect users with the same room name
    socket.join(data?.roomName);
  });

  //when message is hit then it will show that message only to joined rooms users
  socket.on("message", (data) => {
    io.to(data.roomName).emit("message", data); //to chat with particular men ; room can be an array
  });

  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED", socket.id);
  });
}); //socket conection

//TEST LEARNING THINGS
// io.on("connection", (socket) => {
//   // console.log("socket", socket);
//   // socket.on("send-message", (data) => {
//   //   //used to recive data on server
//   //   console.log("data", data);
//   // });

//   // socket.on("message", (data) => {
//   //   console.log(data);        //here we recieve data on backend
//   //   io.emit("message", data);     //it will emit that data to all the users
//   //   // socket.broadcast.emit("message", data);     //it will emit that data to all the users
//   // });

//   socket.on("message", (data) => {      //to chat with particular men
//     console.log(data);        //here we recieve data on backend
//     io.to(data.roomsId).emit("message", data.message);     //room can be an array
//     // socket.broadcast.emit("message", data);     //it will emit that data to all the users
//   });

// socket.on("join-room", (data) => {      //Custom Room
//   console.log(data);        //here we recieve data on backend
//   socket.join(data)
// });

//   // socket.emit("welcome", `Welcome to the server ${socket.id}`); //Message will go to all socket like to localhost on frontend they recieve same messages
//   // socket.broadcast.emit("welcome", `Welcome to the server ${socket.id}`); //Message will not go to the socket like first localhost and will be visible on 2nd localhost; we will brodasted socket id of first localhost on 2nd localhost etc
  // socket.on("disconnect", () => {
  //   console.log("USER DISCONNECTED", socket.id);
  // });
// });

const jwt = require("jsonwebtoken");
const productController = require("./src/controller/product"); //MVC APPROACH OF data.json
const router = express.Router(); //MVC APPROACH OF data.json
const productRouter = require("./src/routes/product"); //MVC shorthand
const authRouter = require("./src/routes/auth");
const userRouter = require("./src/routes/user");
const roomRouter = require("./src/routes/room");
const fs = require("fs"); //for crud using data.json
const cors = require("cors");

const mongoose = require("mongoose"); //importing Mongoose
main().catch((err) => console.log("error", err)); //connecting Mongoose

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce"); //match id(27017) with db port
  console.log("mongoose connected");
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

//--middleware--
const authMiddleware = (req, res, next) => {
  //method of initializing middleware
  const token = req.get("Authorization")?.split("Bearer ")[1]; //as log contains = Bearer eyJhbGciOiJ
  try {
    const decoded = jwt.verify(token, "shhhhh"); //log gives { email: 'vats@gmail.com', iat: 1702471866 }
    console.log("decoded", decoded);
    if (decoded.email) {
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    res.sendStatus(401);
    console.log("error", error);
  }
};

//--middleware--

server.use(cors());
server.use(express.json()); //body parser
server.use("/products", authMiddleware, productRouter.router); //adding authMiddleware so that only verified user can login(SELECT BEARNER IN AUTHORIZATION)
server.use("/auth", authRouter.router);
server.use("/users", authMiddleware, userRouter.router);
server.use("/room", roomRouter.router);
// server.listen(8080, () => console.log("server started")); //starting server
appServerSocket.listen(8080, () => console.log("server started")); //socket server

// ---------------Mongoose API--------------------

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
