const productModel = require("../db/models/productModel");

const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

const getAll = catchAsyncError(async (req, res, next) => {
  const data = await productModel.find();
  res.status(200).json({
    success: true,
    message: "successful",
    data: data,
  });
});
const getById = catchAsyncError(async (req, res, next) => {
  let data = await productModel.findById(req.params.id);
  if (!data) {
    return res.send({ message: "No data found", status: 404 });
  }
  res.send({ message: "success", status: 200, data: data });
});
const createData = catchAsyncError(async (req, res, next) => {
  console.log("req", req.body);

  const data = await productModel.create(req.body);
  res.send({ message: "success", status: 201, data: data });
});

const updateData = async (req, res, next) => {
  try {
    let data = await productModel.findById(req.params.id);

    if (!data) {
      console.log("if");
      return res.send({ message: "No data found", status: 404 });
    }

    data = await productModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModified: false,
    });
    res.status(200).json({
      success: true,
      message: "Update successfully",
      data: data,
    });
  } catch (error) {
    console.log("error", error);
    res.send({ message: "error", status: 400, error: error });
  }
};
const patchData = async (req, res, next) => {
  console.log("patchData function is working");
};
const deleteData = catchAsyncError(async (req, res, next) => {
  console.log("deleteData function is working");
  let data = await productModel.findById(req.params.id);
  console.log("data", data);
  if (!data) {
    console.log("if");
    return res.send({ message: "No data found", status: 404 });
  }

  await data.remove();
  res.status(200).json({
    success: true,
    message: "Delete successfully",
    data: data,
  });
});
module.exports = {
  getAll,
  getById,
  createData,
  updateData,
  patchData,
  deleteData,
};
