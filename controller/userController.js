const userModel = require("../db/models/userModel");
const ErrorHander = require("../utils/errorHandler");
const catchAsyncError = require("../middleware/catchAsyncError");

const createData = catchAsyncError(async (req, res, next) => {
  let newIdserial;
  let newIdNo;
  let newId;
  const lastDoc = await userModel.find().sort({ _id: -1 });
  if (lastDoc.length > 0) {
    newIdserial = lastDoc[0].user.slice(0, 1);
    newIdNo = parseInt(lastDoc[0].user.slice(1)) + 1;
    newId = newIdserial.concat(newIdNo);
  } else {
    newId = "U100";
  }

  let newData = { ...req.body, user_id: newId };
  console.log("newData --------------------------1212", newData);
  const data = await userModel.create(newData);
  res.send({ message: "success", status: 201, data: data });
});

module.exports = {
  createData,
};
