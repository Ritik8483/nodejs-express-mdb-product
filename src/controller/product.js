const fs = require("fs");
const model = require("../model/product");
const Product = model.Product;

exports.createProducts = async (req, res) => {
  try {
    const product = new Product(req.body);
    const resp = await product.save();
    res.status(201).json(resp);
  } catch (error) {
    res.status(400).json(error);
    console.log("error");
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const productsResp = Product.find();
    const pageSize = +req.query.limit; //no of results
    const pageNumber = +req.query.offset;
    const totalProducts = await Product.find().countDocuments(); //descending order
    if (req.query.order_by) {
      const searchRegEx = new RegExp(req.query.search, "i");
      const order_by = req.query.order_by;
      const order_type = req.query.order_type;
      const allProducts = await productsResp
        .sort({ [order_by]: order_type })
        .find({ $or: [{ title: searchRegEx }, { description: searchRegEx }] })
        .skip(pageSize * (pageNumber - 1)) //skip 0 at Page 1,skip first 3 at page 2
        .limit(pageSize) //pagination
        .exec();
      res
        .status(201)
        .json({ allProducts: allProducts, total_products: totalProducts });
    }
    else{
      const searchRegEx = new RegExp(req.query.search, "i");
      const allProducts = await productsResp
        .find({ $or: [{ title: searchRegEx }, { description: searchRegEx }] })
        .skip(pageSize * (pageNumber - 1)) //skip 0 at Page 1,skip first 3 at page 2
        .limit(pageSize) //pagination
        .exec();
      res
        .status(201)
        .json({ allProducts: allProducts, total_products: totalProducts });
    }
    // const productsResp = await Product.find();
    // res.status(201).json(productsResp);
  } catch (error) {
    res.status(400).json(error);
    console.log("error", error);
  }
};

exports.getSingleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productsResp = await Product.findById(id);
    res.status(201).json(productsResp);
  } catch (error) {
    res.status(400).json(error);
    console.log("error");
  }
};

exports.updatePUTProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const resp = await Product.findOneAndReplace({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(resp);
  } catch (error) {
    res.status(400).json(error);
    console.log("error", error);
  }
};
exports.updatePATCHProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const resp = await Product.findOneAndUpdate({ _id: id }, req.body, {
      new: true,
    });
    res.status(201).json(resp);
  } catch (error) {
    console.log("error", error);
    res.status(400).json(error);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const resp = await Product.findOneAndDelete({ _id: id });
    res.status(201).json(resp);
  } catch (error) {
    console.log("error", error);
    res.status(400).json(error);
  }
};

// const fs = require("fs");
// const jsonData = JSON.parse(fs.readFileSync("data.json", "utf-8"));
// const allProducts = jsonData.products;

// exports.createProducts = (req, res) => {
//     allProducts.push(req.body);
//     res.json(req.body);
//   };

//   exports.getAllProducts = (req, res) => {
//     res.status(201).json(allProducts);
//   };
//   exports.getSingleProduct = (req, res) => {
//     const id = +req.params.id;
//     res.json(allProducts.find((item) => item.id === id));
//   };
//   exports.updatePUTProducts = (req, res) => {
//     const id = +req.params.id;
//     const productIndex = allProducts.findIndex((item) => item.id === id);
//     const updatedProduct = allProducts.splice(productIndex, 1, {
//       ...req.body,
//       id: id,
//     });
//     res.status(201).json();
//   };
//   exports.updatePATCHProducts = (req, res) => {
//     const id = +req.params.id;
//     const productIndex = allProducts.findIndex((item) => item.id === id);
//     const orignalProduct = allProducts[productIndex];
//     const updatedProduct = allProducts.splice(productIndex, 1, {
//       ...orignalProduct,
//       ...req.body,
//     });
//     res.status(201).json();
//   };
//   exports.deleteProduct = (req, res) => {
//     const id = +req.params.id;
//     const productIndex = allProducts.findIndex((item) => item.id === id);
//     allProducts.splice(productIndex, 1);
//     res.status(201).json();
//   };
