const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const roleModel = require("../db/models/roleModel");
const productModel = require("../db/models/productModel");

const getDataWithPagination = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  console.log("===========req.query.page", req.query.page);
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  var query = {};

  if (req.query.roleName) {
    query.role_name = new RegExp(`^${req.query.roleName}$`, "i");
  }

  if (req.query.status) {
    query.status = req.query.status;
  }

  let totalData = await roleModel.countDocuments(query);
  console.log("totalData=================================", totalData);
  const data = await roleModel
    .find(query)
    .sort({ created_at: -1 })
    .skip(startIndex)
    .limit(limit);
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
  let data = await roleModel.findById(req.params.id);
  if (!data) {
    return next(new ErrorHander("No data found", 404));
  }

  res.status(200).json({
    success: true,
    data: data,
  });
});
const createData = catchAsyncError(async (req, res, next) => {
  let newIdserial;
  let newIdNo;
  let newId;
  const lastDoc = await roleModel.find().sort({ _id: -1 });
  console.log("lastDoc 0000000000000000000", lastDoc);
  if (lastDoc.length > 0) {
    newIdserial = lastDoc[0].role_id.slice(0, 1);
    newIdNo = parseInt(lastDoc[0].role_id.slice(1)) + 1;
    newId = newIdserial.concat(newIdNo);
    console.log("newIdserial", newIdserial);
    console.log("newIdNo", newIdNo);
  } else {
    newId = "R100";
  }
  console.log("newId========================", newId);

  let newData = {
    role_id: newId,
    name: req.body.name,
  };

  console.log("newData------------------------------------------", newData);

  const data = await roleModel.create(newData);
  res.status(201).json({ message: "success", data: data });
});
// this function is for managing cancel or update any product quantity

const updateData = catchAsyncError(async (req, res, next) => {
    
  let data = await roleModel.findById(req.params.id);
 

  if (!data) {
    console.log("if");
    return next(new ErrorHander("No data found", 404));
  }

  data = await roleModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModified: false,
  });

  res.status(200).json({
    success: true,
    message: "Update successfully",
    data: data,
  });
});

const deleteData = catchAsyncError(async (req, res, next) => {
  console.log("deleteData function is working");
  let data = await roleModel.findById(req.params.id);
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
  getDataWithPagination,
  getById,
  createData,
  updateData,
  deleteData,
};
