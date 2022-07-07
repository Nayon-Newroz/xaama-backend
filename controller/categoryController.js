const categoryModel = require("../db/models/categoryModel");

const getAll = async (req, res, next) => {
  const data = await categoryModel.find();
  res.status(200).json({
    success: true,
    message: "successful",
    data: data,
  });
};
const getById = async (req, res, next) => {
  try {
    let data = await categoryModel.findById(req.params.id);
    if (!data) {
      return res.send({ message: "No data found", status: 404 });
    }
    res.send({ message: "success", status: 200, data: data });
  } catch (error) {
    console.log("error", error);
    res.send({ message: "error", status: 400, error: error });
  }
};
const createData = async (req, res, next) => {
  console.log("req", req.body);
  try {
    const data = await categoryModel.create(req.body);
    res.send({ message: "success", status: 200, data: data });
  } catch (error) {
    console.log("error", error);
    res.send({ message: "error", status: 400, error: error });
  }
};

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
const deleteData = async (req, res, next) => {
  try {
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
  } catch (error) {
    console.log("error", error);
    res.send({ message: "error", status: 400, error: error });
  }
};
module.exports = {
  getAll,
  getById,
  createData,
  updateData,
  patchData,
  deleteData,
};
