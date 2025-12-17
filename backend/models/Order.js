const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    street: String,
    city: String,
    state: String,
    postal: String,
    country: String,
    product: String,
    quantity: Number,
    unitPrice: Number,
    status: String,
    createdBy: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
