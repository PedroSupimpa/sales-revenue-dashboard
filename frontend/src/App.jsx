import { BrowserRouter, Routes, Route } from "react-router-dom";

import CustomerDashboard from "./pages/CustomerDashboard";
import TopProducts from "./pages/TopProducts";
import SalesAnalytics from "./pages/SalesAnalytics";
import Layout from "./components/Layout";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<CustomerDashboard />} />
          <Route path="/top-products" element={<TopProducts />} />
          <Route path="/sales-analytics" element={<SalesAnalytics />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
