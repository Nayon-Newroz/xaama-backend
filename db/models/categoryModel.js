const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  cat_id: {
    type: Number,
    required: [true, "Please enter category id"],
    trim: true,
    unique: true,
    default: 10000,
  },
  name: {
    type: String,
    required: [true, "Please enter category name"],
    trim: true,
    unique: true,
  },
  parent_id: {
    type: String,
    // default: 10000,
    required: [true, "Please enter parent id"],
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const categoryModel = mongoose.model("category", categorySchema);

const saveData = async () => {
  const userDoc = new categoryModel({ name: "Primary", under_id: "1001" });
  await userDoc.save();
};
// saveData();

module.exports = categoryModel;
