const categoryModel = require("../db/models/categoryModel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");
const orderModel = require("../db/models/orderModel");
const productModel = require("../db/models/productModel");

const getParentDropdown = catchAsyncError(async (req, res, next) => {
  const data = await categoryModel.find({}, "name category_id").lean();
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
  // updating product stock unit ----------------------------
  let productIds = req.body.order_list.map((item) =>
    item.product_id.toString()
  );
  console.log("productIds", productIds);

  if (productIds.length > 0) {
    let products = await productModel.find({
      product_id: { $in: productIds },
    });

    // console.log("products", products);
    if (products.length > 0) {
      let quantityUpdatedProduct = req.body.order_list.map((item) => {
        let dbProduct = products.find(
          (res) => res.product_id === item.product_id
        );
        dbProduct.stock_unit =
          parseInt(dbProduct.stock_unit) - parseInt(item.quantity);

        new Promise((resolve, reject) => {
          productModel
            .findByIdAndUpdate(dbProduct._id, dbProduct, {
              new: true,
              runValidators: true,
              useFindAndModified: false,
            })
            .then((updatedObj) => {
              if (!updatedObj) {
                reject(next(new ErrorHander("No data found", 404)));
              } else {
                resolve(updatedObj);
              }
            })
            .catch((err) => reject(err));
        });

        return dbProduct;
        // console.log("dbProduct", dbProduct);
      });
      console.log("quantityUpdatedProduct", quantityUpdatedProduct);
    }
  } else {
    next(new ErrorHander("Product stock update problem", 404));
  }
  // updating product stock unit ----------------------------
  // console.log("req.body", req.body);
  return;
  let newIdserial;
  let newIdNo;
  let newId;
  const lastDoc = await orderModel.find().sort({ _id: -1 });
  if (lastDoc.length > 0) {
    newIdserial = lastDoc[0].order_id.slice(0, 1);
    newIdNo = parseInt(lastDoc[0].order_id.slice(1)) + 1;
    newId = newIdserial.concat(newIdNo);
  } else {
    newId = "100001";
  }

  // create entry in order collections

  req.body.order_list.map((item) => {
    let newData = {
      order_id: newId,
      customer_name: req.body.customer_name,
      customer_address: req.body.customer_address,
      customer_email: req.body.customer_email,
      customer_phone: req.body.customer_phone,
      product_details: {
        product_id: item._id,
        product_name: item.name,
        quantity: item.quantity,
        price: item.price,
        discount_price: item.discount_price,
      },
      discount: req.body.discount,
      tax: req.body.tax,
      payment_method: req.body.payment_method,
      transaction_type: req.body.transaction_type,
      transaction_id: req.body.transaction_id,
      amount_paid: req.body.amount_paid,
      shipping_address: req.body.shipping_address,
      
    };
  });

  let newData = {
    order_id: newId,
    customer_name: req.body.customer_name,
    customer_email: email,
    customer_phone: phoneNo,
    customer_address: address,
    order_list: orderItems,
  };
  // let newData = { ...req.body, order_id: newId };

  const data = await categoryModel.create(newData);
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

async function getAllLeafNodes(data) {
  console.log("getAllLeafNodes", data);
  let parents = await categoryModel.find({
    name: { $ne: "Primary" },
    parent_name: new RegExp(`^${data.name}$`, "i"),
  });
  // parents = parents.filter((e) => e.name !== "Primary");
  console.log("11111111111", parents);
  if (parents.length < 1) {
    // If the parent has no children, it is a leaf node.
    console.log("data._id", data._id);
    return [data];
  }

  const childPromises = parents.map((item) => getAllLeafNodes(item));
  const childNodes = await Promise.all(childPromises);

  // Use the spread operator to flatten the array of arrays into a single array.
  return [...childNodes.flat()];
}

const getLeafCategoryList = catchAsyncError(async (req, res, next) => {
  console.log("getLeafCategoryList");
  const leafNodes2 = await categoryModel.aggregate([
    // { $match: { parent_name: "Mobile" } },
    {
      $lookup: {
        from: "categories",
        localField: "name",
        foreignField: "parent_name",
        as: "children",
      },
    },
    {
      $addFields: {
        isLeaf: { $eq: ["$children", []] },
      },
    },
    { $match: { isLeaf: true } },
    { $project: { _id: 1, name: 1, parent_name: 1, category_id: 1 } },
  ]);

  // res.json(leafNodes2);

  res.status(200).json({
    success: true,
    message: "successful",
    data: leafNodes2,
  });
});
const getCategoryWiseFilterList = catchAsyncError(async (req, res, next) => {
  console.log("req.body 3213231", req.body);

  const leafNodes = await getAllLeafNodes(req.body);

  console.log("leafNodes", leafNodes.toString());

  const stringIds = [];
  leafNodes.map((res) => {
    stringIds.push(res.category_id.toString());
  });

  console.log("stringIds", stringIds);
  // const stringIds = leafNodes.map((id) => id.toString());
  console.log(stringIds);
  const data = await orderModel
    .find(
      {
        category_id: {
          $in: stringIds,
        },
      },
      "name parent_name filter_id"
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
  console.log("result", result);
  res.status(200).json({
    success: true,
    message: "successful",
    data: result,
  });
});
module.exports = {
  getParentDropdown,
  getLeafCategoryList,
  getDataWithPagination,
  getById,
  createData,
  updateData,
  deleteData,
  getCategoryWiseFilterList,
};
