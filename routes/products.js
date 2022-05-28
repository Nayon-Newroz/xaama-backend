var express = require("express");
const {
  getProducts,
  createProduct,
} = require("../controller/productController");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});
router.post("/product/new", function (req, res, next) {
  createProduct();
  res.send(getProducts());
});

module.exports = router;
