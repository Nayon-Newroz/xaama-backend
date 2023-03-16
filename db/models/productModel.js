const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    // required: [true, "Please enter the product name"],
    trim: true,
    maxLength: [60, "Name can not exceed 60 character"],
  },
  description: {
    type: String,
    // required: [true, "Please enter the product description"],
    trim: true,
    maxLength: [3000, "Name can not exceed 3000 character"],
  },
  price: {
    type: Number,
    // required: [true, "Please enter the product price"],
    maxLength: [16, "Price can not exceed 10 character"],
  },
  rating: [
    {
      user: {
        type: String,
        // default: "user",
        // required: true,
      },
      rating_no: {
        type: Number,
        // required: true,
      },
    },
  ],
  viewed: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    default: 10,
    min: [0, "sorry! out of stock"],
  },
  images: [
    {
      public_id: {
        type: String,
        default: "aaaaaa",
        // required: true,
      },
      url: {
        type: String,
        // required: true,
        default: "aaaaaa",
      },
    },
  ],
  filter_id: {
    type: Array,
  },
  store_id: {
    type: String,
    // required: [true, "Please enter the product category"],
  },
  category_id: {
    type: String,
    // required: [true, "Please enter the product category"],
  },
  location_id: {
    type: String,
    // required: [true, "Please enter the product location"],
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

module.exports = mongoose.model("product", productSchema);
