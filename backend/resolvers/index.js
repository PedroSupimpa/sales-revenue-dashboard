const mongoose = require("mongoose");
const Order = require("../models/Order");
const Customer = require("../models/Customer");
const redis = require("../redis");

const CACHE_TTL = 60 * 5;

module.exports = {
  Query: {
    getCustomerSpending: async (_, { customerId }) => {
      const key = `customer-spending:${customerId}`;
      const cached = await redis.get(key);

      if (cached) {
        console.log(`[Redis] Cache hit for key: ${key}`);
        return JSON.parse(cached);
      }
      console.log(`[Redis] Cache miss for key: ${key}`);

      const objectId = new mongoose.Types.ObjectId(customerId);
      const exists = await Customer.exists({ _id: objectId });
      if (!exists) throw new Error("Customer does not exist");

      const data = await Order.aggregate([
        {
          $match: { customerId: objectId, status: "completed" },
        },
        {
          $group: {
            _id: "$customerId",
            totalSpent: { $sum: "$total" },
            avgOrder: { $avg: "$total" },
            lastOrderDate: { $max: "$orderDate" },
          },
        },
      ]);

      const result = data[0] || {
        totalSpent: 0,
        avgOrder: 0,
        lastOrderDate: null,
      };

      await redis.set(key, JSON.stringify(result), "EX", CACHE_TTL);
      console.log(`[Redis] Cached result for key: ${key}`);
      return result;
    },

    getTopSellingProducts: async (_, { limit }) => {
      const key = `top-products:${limit}`;
      const cached = await redis.get(key);

      if (cached) {
        console.log(`[Redis] Cache hit for key: ${key}`);
        return JSON.parse(cached);
      }
      console.log(`[Redis] Cache miss for key: ${key}`);

      const data = await Order.aggregate([
        { $unwind: "$products" },
        {
          $group: {
            _id: "$products.productId",
            quantitySold: { $sum: "$products.quantity" },
          },
        },
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "_id",
            as: "product",
          },
        },
        { $unwind: "$product" },
        {
          $project: {
            name: "$product.name",
            price: "$product.price",
            quantitySold: 1,
          },
        },
        { $sort: { quantitySold: -1 } },
        { $limit: limit },
      ]);

      await redis.set(key, JSON.stringify(data), "EX", CACHE_TTL);
      console.log(`[Redis] Cached result for key: ${key}`);
      return data;
    },

    getSalesAnalytics: async (_, { startDate, endDate }) => {
      const key = `sales-analytics:${startDate}-${endDate}`;
      const cached = await redis.get(key);

      if (cached) {
        console.log(`[Redis] Cache hit for key: ${key}`);
        return JSON.parse(cached);
      }
      console.log(`[Redis] Cache miss for key: ${key}`);

      const start = new Date(startDate);
      const end = new Date(endDate);

      const data = await Order.aggregate([
        {
          $match: {
            status: "completed",
            orderDate: { $gte: start, $lte: end },
          },
        },
        {
          $facet: {
            totalRevenue: [
              { $group: { _id: null, revenue: { $sum: "$total" } } },
            ],
            completedOrders: [{ $count: "count" }],
            revenuePerCategory: [
              { $unwind: "$products" },
              {
                $lookup: {
                  from: "products",
                  localField: "products.productId",
                  foreignField: "_id",
                  as: "productInfo",
                },
              },
              { $unwind: "$productInfo" },
              {
                $group: {
                  _id: "$productInfo.category",
                  revenue: {
                    $sum: {
                      $multiply: ["$products.quantity", "$productInfo.price"],
                    },
                  },
                },
              },
              {
                $project: {
                  category: "$_id",
                  revenue: 1,
                  _id: 0,
                },
              },
            ],
          },
        },
      ]);

      const result = {
        totalRevenue: data[0].totalRevenue[0]?.revenue || 0,
        completedOrders: data[0].completedOrders[0]?.count || 0,
        revenuePerCategory: data[0].revenuePerCategory,
      };

      await redis.set(key, JSON.stringify(result), "EX", CACHE_TTL);
      console.log(`[Redis] Cached result for key: ${key}`);
      return result;
    },
  },
};
