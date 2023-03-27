var express = require("express");
const {
  getParentDropdown,
  // getCategoryWiseFilterList,
  getDataWithPagination,
  getById,
  createData,
  updateData,
  deleteData,
} = require("../controller/filterController");
const filterModel = require("../db/models/filterModel");

var router = express.Router();

router.route("/").get(getDataWithPagination);
// router.route("/category-filter-list").post(getCategoryWiseFilterList);
router.route("/dropdownlist").get(getParentDropdown);
router.route("/:id").get(getById);
router.route("/create").post(createData);
router.route("/update/:id").put(updateData);
router.route("/delete/:id").delete(deleteData);

module.exports = router;
