const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  products: Array,
  amount: Number,
  status: {
    type: String,
    default: "Order Placed"
  },
  customer: {
    name: String,
    phone: String,
    address: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  paymentMethod:{
    type: String,
    enum: ["COD", "ONLINE"],
    default: "COD"
  }
});
