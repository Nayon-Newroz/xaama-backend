var express = require("express");
const {
  getParentDropdown,
  getDataWithPagination,
  getCategoryWiseFilters,
  getById,
  createData,
  updateData,
  deleteData,
} = require("../controller/filterController");
const filterModel = require("../db/models/filterModel");

var router = express.Router();

router.route("/").get(getDataWithPagination);
router.route("/dropdownlist").get(getParentDropdown);
router.route("/category-filter").get(getCategoryWiseFilters);
router.route("/:id").get(getById);
router.route("/create").post(createData);
router.route("/update/:id").put(updateData);
router.route("/delete/:id").delete(deleteData);

module.exports = router;
