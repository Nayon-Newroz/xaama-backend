const categoryModel = require("../db/models/categoryModel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

const getAll = catchAsyncError(async (req, res, next) => {
  const data = await categoryModel.find();
  res.status(200).json({
    success: true,
    message: "successful",
    data: data,
  });
});
const getDataWithPagination = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let totalData = await categoryModel.countDocuments();
  console.log("totalData=================================", totalData);
  const data = await categoryModel.find().skip(startIndex).limit(limit);
  res.status(200).json({
    success: true,
    message: "successful",
    data: data,
    totalData: totalData,
    pageNo: page,
    limit: limit,
  });
});
const getById = catchAsyncError(async (req, res, next) => {
  let data = await categoryModel.findById(req.params.id);
  if (!data) {
    return res.send({ message: "No data found", status: 404 });
  }
  res.send({ message: "success", status: 200, data: data });
});
const getFilterItems = catchAsyncError(async (req, res, next) => {
  let data = await categoryModel.findById(req.params.id);
  if (!data) {
    return res.send({ message: "No data found", status: 404 });
  }
  res.send({ message: "success", status: 200, data: data });
});
const createData = catchAsyncError(async (req, res, next) => {
  // Category id start number 10000
  let newData = req.body;
  let lastData = await categoryModel.find().sort({ _id: -1 }).limit(1);
  console.log("lastData", lastData);
  if (lastData.length > 0 && lastData[0].cat_id) {
    console.log("if===================");
    Object.assign(newData, { cat_id: parseInt(lastData[0].cat_id + 1) });
  }
  if (lastData.length < 1) {
    console.log("if===================");
    Object.assign(newData, { parent_id: 10000 });
  }
  const data = await categoryModel.create(newData);
  res.send({ message: "success", status: 201, data: data });
});

const updateData = async (req, res, next) => {
  try {
    let data = await categoryModel.findById(req.params.id);

    if (!data) {
      console.log("if");
      return res.send({ message: "No data found", status: 404 });
    }

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
  let data = await categoryModel.findById(req.params.id);
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
  getDataWithPagination,
  getById,
  getFilterItems,
  createData,
  updateData,
  patchData,
  deleteData,
};
