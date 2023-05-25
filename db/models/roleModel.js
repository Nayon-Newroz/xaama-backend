const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role_id: {
    type: String,
    required: [true, "Please enter order id"],
  },

  role_name: {
    type: String,
    required: [true, "Please enter customer name"],
  },

  permission: Array,

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

const roleModel = mongoose.model("role", roleSchema);
const saveData = async () => {
  let totalData = await roleModel.countDocuments();
  console.log("totalData 123456", totalData);
  if (totalData < 1) {
    const roleDoc = new roleModel({
      category_id: "R100",
      name: "Super Admin",
      permission: ["All"],
    });
    await roleDoc.save();
  }
};
saveData();

module.exports = roleModel;
