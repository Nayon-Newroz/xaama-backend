var express = require("express");
const {
  getParentDropdown,
  getLeafCategoryList,
  getDataWithPagination,
  getById,
  createData,
  updateData,
  deleteData,
  getCategoryWiseFilterList,
} = require("../controller/userController");
const userModel = require("../db/models/userModel");

var router = express.Router();

// router.route("/").get(getDataWithPagination);
// router.route("/dropdownlist").get(getParentDropdown);
// router.route("/leaf-dropdown").get(getLeafCategoryList);
// router.route("/:id").get(getById);
router.route("/create").post(createData);
// router.route("/update/:id").put(updateData);
// router.route("/delete/:id").delete(deleteData);
// router.route("/category-filter-list").post(getCategoryWiseFilterList);

module.exports = router;
