const mongoose = require("mongoose");

const filterSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter category name"],
    trim: true,
    unique: true,
  },
  parent_name: {
    type: String,
    // default: 10000,
    required: [true, "Please enter parent name"],
  },
  category_id: {
    type: Array,
  },
  status: {
    type: Boolean,
    default: true,
  },
  created_by: {
    type: String,
    trim: true,
    default: "Admin",
  },
  created_at: { type: Date, default: Date.now },
  updated_by: {
    type: String,
    trim: true,
    default: "N/A",
  },
  updated_at: { type: Date, default: Date.now },
});

const filterModel = mongoose.model("filter", filterSchema);

const saveData = async () => {
  let totalData = await filterModel.countDocuments();
  console.log("totalData 123456", totalData);
  if (totalData < 1) {
    const filterDoc = new filterModel({
      name: "Primary",
      parent_name: "None",
    });
    await filterDoc.save();
  }
};
saveData();

module.exports = filterModel;
