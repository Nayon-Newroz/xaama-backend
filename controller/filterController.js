const filterModel = require("../db/models/filterModel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

const getParentDropdown = catchAsyncError(async (req, res, next) => {
  const data = await filterModel.find({}, "name").lean();
  res.status(200).json({
    success: true,
    message: "successful",
    data: data,
  });
});
const getDataWithPagination = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  console.log("===Filter========req.query.page", req.query.page);
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  var query = {};
  if (req.query.name) {
    query.name = new RegExp(`^${req.query.name}$`, "i");
  }
  if (req.query.status) {
    query.status = req.query.status;
  }
  if (req.query.parent_name) {
    query.parent_name = new RegExp(`^${req.query.parent_name}$`, "i");
  }
  let totalData = await filterModel.countDocuments(query);
  console.log("totalData=================================", totalData);
  const data = await filterModel.find(query).skip(startIndex).limit(limit);
  console.log("data", data);
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
  let data = await filterModel.findById(req.params.id);
  if (!data) {
    return res.send({ message: "No data found", status: 404 });
  }
  res.send({ message: "success", status: 200, data: data });
});
const getCategoryWiseFilters = catchAsyncError(async (req, res, next) => {
  let data = await filterModel.findById(req.params.id);
  if (!data) {
    return res.send({ message: "No data found", status: 404 });
  }
  res.send({ message: "success", status: 200, data: data });
});

const createData = catchAsyncError(async (req, res, next) => {
  // Category id start number 10000
  let newData = req.body;

  const data = await filterModel.create(req.body);
  res.send({ message: "success", status: 201, data: data });
});

const updateData = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;
  let data = await filterModel.findById(req.params.id);
  let oldParentName = data.name;
  if (!data) {
    console.log("if");
    return next(new ErrorHander("No data found", 404));
  }

  data = await filterModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModified: false,
  });
  const childrenParentUpdate = await filterModel.updateMany(
    { parent_name: oldParentName },
    { $set: { parent_name: name } }
  );
  res.status(200).json({
    success: true,
    message: "Update successfully",
    data: data,
    childrenParentUpdate,
  });
});

const deleteData = catchAsyncError(async (req, res, next) => {
  console.log("deleteData function is working");
  let data = await filterModel.findById(req.params.id);
  console.log("data", data);
  if (!data) {
    console.log("if");
    return next(new ErrorHander("No data found", 404));
  }

  await data.remove();
  res.status(200).json({
    success: true,
    message: "Delete successfully",
    data: data,
  });
});
module.exports = {
  getParentDropdown,
  getDataWithPagination,
  getCategoryWiseFilters,
  getById,
  createData,
  updateData,
  deleteData,
};
