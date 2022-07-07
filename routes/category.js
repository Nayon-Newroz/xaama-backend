var express = require("express");
const {
  getAll,
  getById,
  createData,
  updateData,
  patchData,
  deleteData,
} = require("../controller/categoryController");
const categoryModel = require("../db/models/categoryModel");

var router = express.Router();

router.route("/").get(getAll);
router.route("/:id").get(getById);
router.route("/create").post(createData);
router.route("/update/:id").put(updateData);
router.route("/patch/:id").patch(patchData);
router.route("/delete/:id").delete(deleteData);

module.exports = router;
