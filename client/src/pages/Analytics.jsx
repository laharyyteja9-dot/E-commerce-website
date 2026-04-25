import { useState, useEffect } from 'react';
import { api } from '../services/api';
import './Analytics.css';

export default function Analytics() {
  const [topProducts, setTopProducts] = useState([]);
  const [salesByDay, setSalesByDay] = useState([]);
  const [revenueByCategory, setRevenueByCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const [topProds, sales, revenue] = await Promise.all([
        api.getTopProducts(),
        api.getSalesByDay(),
        api.getRevenueByCategory()
      ]);
      setTopProducts(topProds);
      setSalesByDay(sales);
      setRevenueByCategory(revenue);
    } catch (error) {
      console.error('Failed to fetch analytics', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analytics">
      <h1>Analytics Dashboard</h1>
      {loading && <p>Loading analytics...</p>}

      <div className="analytics-grid">
        <section className="analytics-card">
          <h2>Top 10 Products</h2>
          <table>
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Quantity</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((p, idx) => (
                <tr key={idx}>
                  <td>{p._id}</td>
                  <td>{p.totalQuantity}</td>
                  <td>${p.revenue?.toFixed(2) || '0.00'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="analytics-card">
          <h2>Revenue by Category</h2>
          <table>
            <thead>
              <tr>
                <th>Category</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {revenueByCategory.map((r, idx) => (
                <tr key={idx}>
                  <td>{r._id}</td>
                  <td>${r.revenue?.toFixed(2) || '0.00'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="analytics-card full-width">
          <h2>Sales by Day</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Orders</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {salesByDay.map((s, idx) => (
                <tr key={idx}>
                  <td>{s._id}</td>
                  <td>{s.totalOrders}</td>
                  <td>${s.totalRevenue?.toFixed(2) || '0.00'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}
