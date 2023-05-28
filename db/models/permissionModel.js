const mongoose = require("mongoose");

const permissionSchema = mongoose.Schema({
  permission_id: {
    type: String,
    required: [true, "Please enter permission id"],
  },
  name: {
    type: String,
    required: [true, "Please enter permission name"],
    trim: true,
    unique: true,
  },
  module_name: {
    type: String,
    // default: 10000,
    required: [true, "Please enter parent name"],
  },
  category_id: {
    type: Array,
  },
  remarks: {
    type: String,
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

const permissionModel = mongoose.model("permission", permissionSchema);

const saveData = async () => {
  let totalData = await permissionModel.countDocuments();
  console.log("totalData 123456", totalData);
  if (totalData < 1) {
    const permissionDoc = new permissionModel({
      permission_id: "per100",
      name: "Primary",
      module_name: "Primary",
    });
    await permissionDoc.save();
  }
};
saveData();

module.exports = permissionModel;
