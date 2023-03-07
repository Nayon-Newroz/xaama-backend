const categoryModel = require("../db/models/categoryModel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const filterModel = require("../db/models/filterModel");

const getParentDropdown = catchAsyncError(async (req, res, next) => {
  const data = await categoryModel.find({}, "name").lean();
  res.status(200).json({
    success: true,
    message: "successful",
    data: data,
  });
});
const getDataWithPagination = catchAsyncError(async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  console.log("===========req.query.page", req.query.page);
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
  let totalData = await categoryModel.countDocuments(query);
  console.log("totalData=================================", totalData);
  const data = await categoryModel.find(query).skip(startIndex).limit(limit);
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
  let data = await categoryModel.findById(req.params.id);
  if (!data) {
    return res.send({ message: "No data found", status: 404 });
  }
  res.send({ message: "success", status: 200, data: data });
});

const createData = catchAsyncError(async (req, res, next) => {
  // Category id start number 10000
  let newData = req.body;

  const data = await categoryModel.create(req.body);
  res.send({ message: "success", status: 201, data: data });
});

const updateData = catchAsyncError(async (req, res, next) => {
  const { name } = req.body;

  let data = await categoryModel.findById(req.params.id);
  let oldParentName = data.name;

  if (!data) {
    console.log("if");
    return next(new ErrorHander("No data found", 404));
  }

  data = await categoryModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModified: false,
  });

  const childrenParentUpdate = await categoryModel.updateMany(
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
  let data = await categoryModel.findById(req.params.id);
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

const getCategoryWiseFilterList = catchAsyncError(async (req, res, next) => {
  console.log("req.body 3213231", req.body.category_name);

  let ids = [];
  let parents = await categoryModel.find({
    parent_name: new RegExp(`^${req.body.category_name}$`, "i"),
  });
  async function findLeafNodes() {
    console.log("findLeafNodes");
    parents.map(async (item) => {
      let node = await categoryModel.find({
        parent_name: new RegExp(`^${item.name}$`, "i"),
      });
      console.log("node", node);
      if (node.length === 0) {
        console.log("if");
        // ids.push(node);
      } else {
        console.log("else");
        // return findLeafNodes();
      }
    });
  }
  findLeafNodes();
  // const children = parents.flatMap((node) => node.name || []);
  // if (children.length === 0) {
  //   return parents;
  // } else {
  //   return getChildrens();
  // }
  console.log("parents", parents);
  console.log("ids", ids);
  res.status(200).json({
    success: true,
    message: "successful",
    data: parents,
  });
  return;
  const data = await filterModel
    .find(
      {
        category_id: {
          $in: req.body.category_Ids,
        },
      },
      "name parent_name"
    )
    .lean()
    .sort({ parent_name: 1 });

  let result = [];

  data.map((p) => {
    // filterValues.some((e) => e.filter_name === p.parent_name);
    if (!result.some((e) => e.filter_name === p.parent_name)) {
      let filterDataByParentName = data.filter(
        (res) => res.parent_name === p.parent_name
      );
      result.push({
        filter_name: p.parent_name,
        filter_values: filterDataByParentName,
      });
    }
  });

  res.status(200).json({
    success: true,
    message: "successful",
    data: result,
  });
});
module.exports = {
  getParentDropdown,
  getDataWithPagination,
  getById,
  createData,
  updateData,
  deleteData,
  getCategoryWiseFilterList,
};
