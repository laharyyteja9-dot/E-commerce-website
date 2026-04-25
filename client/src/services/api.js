import axios from 'axios';

const API_BASE = 'http://localhost:4000/api';

export const api = {
  getProducts: () => axios.get(`${API_BASE}/products`).then(r => r.data),
  getUsers: () => axios.get(`${API_BASE}/users`).then(r => r.data),
  getOrders: () => axios.get(`${API_BASE}/orders`).then(r => r.data),
  createOrder: (data) => axios.post(`${API_BASE}/orders`, data).then(r => r.data),
  getTopProducts: () => axios.get(`${API_BASE}/analytics/top-products`).then(r => r.data),
  getSalesByDay: () => axios.get(`${API_BASE}/analytics/sales-by-day`).then(r => r.data),
  getRevenueByCategory: () => axios.get(`${API_BASE}/analytics/revenue-by-category`).then(r => r.data)
};
