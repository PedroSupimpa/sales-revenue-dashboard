const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Customer = require("./models/Customer");
const Product = require("./models/Product");
const Order = require("./models/Order");

const runSeed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB for seed");

  await Customer.deleteMany();
  await Product.deleteMany();
  await Order.deleteMany();

  const customers = await Customer.insertMany([
    { name: "John Smith", email: "john@example.com" },
    { name: "Jane Doe", email: "jane@example.com" },
  ]);

  customers.forEach((c) => {
    console.log(`Customer Name: ${c.name}, ID: ${c._id}`);
  });

  const products = await Product.insertMany([
    { name: "Wireless Mouse", category: "Electronics", price: 25 },
    { name: "Running Shoes", category: "Footwear", price: 80 },
    { name: "Bluetooth Speaker", category: "Electronics", price: 55 },
    { name: "Yoga Mat", category: "Fitness", price: 30 },
    { name: "Notebook", category: "Stationery", price: 12 },
    { name: "T-Shirt", category: "Apparel", price: 20 },
    { name: "Sunglasses", category: "Accessories", price: 50 },
    { name: "Wrist Watch", category: "Accessories", price: 95 },
    { name: "Leather Wallet", category: "Accessories", price: 40 },
    { name: "LED Desk Lamp", category: "Home", price: 35 },
    { name: "Backpack", category: "Travel", price: 60 },
    { name: "Headphones", category: "Electronics", price: 90 },
    { name: "Fitness Tracker", category: "Fitness", price: 70 },
    { name: "Water Bottle", category: "Accessories", price: 15 },
    { name: "Baseball Cap", category: "Apparel", price: 18 },
    { name: "Sneakers", category: "Footwear", price: 100 },
    { name: "Power Bank", category: "Electronics", price: 45 },
    { name: "Laptop Stand", category: "Electronics", price: 50 },
    { name: "Desk Organizer", category: "Stationery", price: 28 },
    { name: "Face Cream", category: "Health", price: 22 },
    { name: "Bluetooth Earbuds", category: "Electronics", price: 65 },
    { name: "Travel Mug", category: "Travel", price: 20 },
    { name: "Running Shorts", category: "Apparel", price: 30 },
    { name: "Wireless Charger", category: "Electronics", price: 35 },
    { name: "Folding Chair", category: "Home", price: 75 },
  ]);

  const orders = [];

  for (let i = 0; i < products.length; i += 3) {
    const slice = products.slice(i, i + 3);
    const quantity = [1, 2, 1];
    const total = slice.reduce(
      (acc, product, idx) => acc + product.price * quantity[idx],
      0
    );

    orders.push({
      customerId: customers[i % 2]._id,
      products: slice.map((product, idx) => ({
        productId: product._id,
        quantity: quantity[idx],
      })),
      total,
      status: "completed",
      orderDate: new Date(`2025-04-${(i % 28) + 1}`),
    });
  }

  await Order.insertMany(orders);

  console.log("Seeding completed");
  process.exit();
};

runSeed();
