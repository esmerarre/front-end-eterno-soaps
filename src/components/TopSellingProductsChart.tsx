import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import topSellingData from "../data/topsellingproducts.json";

export default function TopSellingProductsChart() {
  return (
    <div className="chart-card">
      <h2>Top Selling Products</h2>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topSellingData.topProducts}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="productName" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="unitsSold" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
