var express = require("express");
const {
  getById,
  createData,
  getDataWithPagination,
  deleteData,
  loginUser,
  logout,
  updatePassword,
  updateProfile,
} = require("../controller/userController");
const userModel = require("../db/models/userModel");

var router = express.Router();

router.route("/").get(getDataWithPagination);
// router.route("/dropdownlist").get(getParentDropdown);
// router.route("/leaf-dropdown").get(getLeafCategoryList);
router.route("/logout").get(logout);
router.route("/:id").get(getById);
router.route("/create").post(createData);
// router.route("/update/:id").put(updateData);
router.route("/delete/:id").delete(deleteData);
router.route("/login").post(loginUser);
router.route("/update-password").post(updatePassword);
router.route("/update-profile").post(updateProfile);

// router.route("/category-filter-list").post(getCategoryWiseFilterList);

module.exports = router;
