const express = require("express");
const productController = require("../controller/product");
const router = express.Router();

router
  .post("/", productController.createProducts)
  .get("/", productController.getAllProducts)
  .get("/:id", productController.getSingleProduct)
  .put("/:id", productController.updatePUTProducts)
  .patch("/:id", productController.updatePATCHProducts)
  .delete("/:id", productController.deleteProduct);

  exports.router = router
