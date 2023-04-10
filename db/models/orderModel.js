const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    required: true,
  },
  customer_name: {
    type: String,
    required: true,
  },
  customer_address: {
    type: String,
    required: true,
  },
  customer_email: {
    type: String,
    required: true,
  },
  customer_phone: {
    type: String,
    required: true,
  },
  product_id: {
    type: String,
    required: true,
  },
  product_name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
  transaction_type: {
    type: String,
    enum: ["Online", "Offline"],
    required: true,
  },
  transaction_id: {
    type: String,
    required: true,
  },
  amount_paid: {
    type: Number,
    required: true,
  },
  shipping_address: {
    type: String,
    required: true,
  },
  tracking_info: {
    type: String,
  },
  remarks: {
    type: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Canceled"],
    default: "Pending",
    
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

const orderModel = mongoose.model("order", OrderSchema);

module.exports = orderModel;
