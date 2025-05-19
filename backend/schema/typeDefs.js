const { gql } = require("apollo-server-express");

module.exports = gql`
  type CustomerSpending {
    totalSpent: Float
    avgOrder: Float
    lastOrderDate: String
  }

  type TopProduct {
    name: String
    quantitySold: Int
    price: Float
  }

  type CategoryRevenue {
    category: String
    revenue: Float
  }

  type SalesAnalytics {
    totalRevenue: Float
    completedOrders: Int
    revenuePerCategory: [CategoryRevenue]
  }

  type Query {
    getCustomerSpending(customerId: ID!): CustomerSpending
    getTopSellingProducts(limit: Int!): [TopProduct]
    getSalesAnalytics(startDate: String!, endDate: String!): SalesAnalytics
  }
`;
