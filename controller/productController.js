const Product = require("../db/models/productModel");

exports.getProducts = (req, res) => {
  //   res.status(200).json({ message: "Function is working fine" });
  //   res.json({ message: "Function is working fine" });
  console.log("working getProducts function");
};
exports.createProduct = async (req, res, next) => {
    console.log('req',req);
  const product = await Product.create(req.body);
  console.log("product", product);
};
