const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter category name"],
    trim: true,
    unique: true,
  },
  under_id: {
    type: String,
    // required: [true, "Please enter under id"],
  },
});

const categoryModel = mongoose.model("category", categorySchema);

const saveData = async () => {
  const userDoc = new categoryModel({ name: "All", under_id: "1001" });
  await userDoc.save();
};
// saveData();

module.exports = categoryModel;
