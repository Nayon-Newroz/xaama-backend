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
    trim: true,
  },
  price: {
    type: Number,
    // required: [true, "Please enter the product price"],
    maxLength: [16, "Price can not exceed 10 character"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  viewed: {
    type: Number,
    default: 0,
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
filterId:{
  type:Array
},
  storeId: {
    type: String,
    // required: [true, "Please enter the product category"],
  },
  categoryId: {
    type: String,
    // required: [true, "Please enter the product category"],
  },
  locationId: {
    type: String,
    // required: [true, "Please enter the product location"],
  },
  status: {
    type: Boolean,
    default: true,
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
