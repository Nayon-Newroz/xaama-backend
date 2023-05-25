var express = require("express");
const {
  getAll,
  getDataByProductIds,
  getDataWithPagination,
  getById,
  getFilterItems,
  createData,
  updateData,
  patchData,
  deleteData,
} = require("../controller/productController");
const productModel = require("../db/models/productModel");

var router = express.Router();

router.route("/").get(getDataWithPagination);
router.route("/:id").get(getById);
router.route("/product-list-by-ids").post(getDataByProductIds);
// router.route("/:filters").get(getFilterItems);
router.route("/create").post(createData);
router.route("/update/:id").put(updateData);
router.route("/patch/:id").patch(patchData);
router.route("/delete/:id").delete(deleteData);

module.exports = router;
