const mongoose = require("mongoose");

const locationSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter location name"],
    trim: true,
  },
  under: {
    type: String,
    // required: [true, "Please enter   name"],
  },
});

const locationModel = mongoose.model("location", locationSchema);
const userDoc = new locationModel({ name: 'Foo' });
await userDoc.save();

module.exports = locationModel;
