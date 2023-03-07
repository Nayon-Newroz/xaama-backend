var express = require("express");
const {
  getParentDropdown,
  getDataWithPagination,
  getById,
  createData,
  updateData,
  deleteData,
  getCategoryWiseFilterList,
} = require("../controller/categoryController");
const categoryModel = require("../db/models/categoryModel");

var router = express.Router();

router.route("/").get(getDataWithPagination);
router.route("/dropdownlist").get(getParentDropdown);
router.route("/:id").get(getById);
router.route("/create").post(createData);
router.route("/update/:id").put(updateData);
router.route("/delete/:id").delete(deleteData);
router.route("/category-filter-list").post(getCategoryWiseFilterList);

module.exports = router;
