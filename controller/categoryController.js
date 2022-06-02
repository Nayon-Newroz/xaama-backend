const categoryModel = require("../db/models/categoryModel");

const getAll = async (req, res, next) => {
  const data = await categoryModel.find();
  res.status(200).json({
    success: true,
    message: "successful",
    data: data,
  });
};

const createData = async (req, res, next) => {
  console.log("req", req.body);

  const data = await categoryModel.create(req.body);

  res.send({ message: "success", status: 200, data: data });
};

const updateData = async (req, res, next) => {
  console.log("req.params.id", req.params.id);
  let data = await categoryModel.findById(req.params.id);
  console.log("data", data);
  if (!data) {
    console.log("if");
    return res.status(200).json({
      success: false,
      message: "No data found",
    });
  }
  console.log("!!!!!!!!!!");
  data = await categoryModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModified: false,
  });
  res.status(200).json({
    success: true,
    message: "Update successfully",
    data: data,
  });
};
const patchData = async (req, res, next) => {
  console.log("patchData function is working");
};
const deleteData = async (req, res, next) => {
  console.log("deleteData function is working");
  let data = await categoryModel.findById(req.params.id);
  console.log("data", data);
  if (!data) {
    console.log("if");
    return res.status(200).json({
      success: false,
      message: "No data found",
    });
  }

  await data.remove();
  res.status(200).json({
    success: true,
    message: "Delete successfully",
    data: data,
  });
};
module.exports = {
  getAll,
  createData,
  updateData,
  patchData,
  deleteData,
};
