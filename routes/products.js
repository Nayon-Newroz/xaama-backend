var express = require("express");
const {
  getProducts,
  createProduct,
} = require("../controller/productController");
const productModel = require("../db/models/productModel");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  // res.status(200).json({
  //   message:'suggess'
  // })
  getProducts()
  res.send({ message: "success", status: 200 });
  // res.send("respond with a resource");
});
router.post("/create", async function (req, res, next) {
  console.log("req123456", req.body);
  const product = await productModel.create(req.body);
  console.log("product", product);
  res.send({ message: "success", status: 200 });
  // createProduct();
  // res.send(getProducts());
});

module.exports = router;
