const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter location name"],
    trim: true,
  },
  under_id: {
    type: String,
    // required: [true, "Please enter under id"],
  },
});

const locationModel = mongoose.model("location", locationSchema);

const saveData = async () => {
  const userDoc = new locationModel({ name: "All", under_id: "1001" });
  await userDoc.save();  
};
// saveData();

module.exports = locationModel;
