import { gql } from "@apollo/client";

export const GET_CUSTOMER_SPENDING = gql`
  query GetCustomerSpending($customerId: ID!) {
    getCustomerSpending(customerId: $customerId) {
      totalSpent
      avgOrder
      lastOrderDate
    }
  }
`;

export const GET_TOP_SELLING_PRODUCTS = gql`
  query GetTopSellingProducts($limit: Int!) {
    getTopSellingProducts(limit: $limit) {
      name
      quantitySold
      price
    }
  }
`;

export const GET_SALES_ANALYTICS = gql`
  query GetSalesAnalytics($startDate: String!, $endDate: String!) {
    getSalesAnalytics(startDate: $startDate, endDate: $endDate) {
      totalRevenue
      completedOrders
      revenuePerCategory {
        category
        revenue
      }
    }
  }
`;
