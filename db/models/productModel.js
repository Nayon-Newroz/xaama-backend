const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Please enter the product name"],
    trim: true,
  },
  description: {
    type: String,
    // required: [true, "Please enter the product description"],
  },
  price: {
    type: Number,
    // required: [true, "Please enter the product price"],
    maxLength: [10, "Price can not exceed 10 character"],
  },
  rating: {
    type: String,
    default: 0,
  },
  viewed: {
    type: Number,
  },
  images: [
    {
      public_id: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
    },
  ],
  category: {
    type: String,
    // required: [true, "Please enter the product category"],
  },
  location: {
    type: String,
    // required: [true, "Please enter the product location"],
  },
  status: {
    type: Boolean,
  },
  createdBy: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedBy: {
    type: String,
    trim: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("product", productSchema);
