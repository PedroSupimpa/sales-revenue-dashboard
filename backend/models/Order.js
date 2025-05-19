const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number
    }
  ],
  total: Number,
  status: { type: String, enum: ["pending", "completed", "cancelled"], default: "pending" },
  orderDate: Date
});

module.exports = mongoose.model("Order", orderSchema);
