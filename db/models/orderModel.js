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
  product_details: [
    {
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
        min: 0,
        required: true,
      },
      price: {
        type: Number,
        min: 0,
        required: true,
      },
      remarks: {
        type: String,
      },
      status: {
        type: String,
        default: true,
      },
    },
  ],
  transaction_type: {
    type: String,
    enum: ["Online", "Offline"],
    required: true,
  },
  payment_method: {
    type: String,
    required: true,
  },

  transaction_id: {
    type: String,
    default: "N/A",
  },
  discount: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
  total_amount: {
    type: Number,
    required: true,
  },
  amount_paid: {
    type: Number,
    // required: true,
  },

  shipping_address: {
    type: String,
    required: true,
  },
  tracking_info: {
    type: String,
    default: "store",
  },
  remarks: {
    type: String,
  },
  order_status: {
    type: String,
    enum: ["Pending", "Processing", "Shipped", "Canceled"],
    default: "Pending",
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

const orderModel = mongoose.model("order", OrderSchema);

module.exports = orderModel;
