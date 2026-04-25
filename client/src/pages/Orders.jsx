import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';
import './Orders.css';

export default function Orders() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }
    fetchOrders();
  }, [user, navigate]);

  const fetchOrders = async () => {
    try {
      const data = await api.getOrders();
      // Filter orders for the current user
      const userOrders = data.filter(order => order.userId === user.id);
      setOrders(userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (error) {
      console.error('Failed to fetch orders', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: '⏳',
      confirmed: '✅',
      shipped: '📦',
      delivered: '🎉',
      cancelled: '❌',
    };
    return icons[status] || '📦';
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#FFC107',
      confirmed: '#2196F3',
      shipped: '#4CAF50',
      delivered: '#00C853',
      cancelled: '#F44336',
    };
    return colors[status] || '#999';
  };

  if (loading) {
    return (
      <div className="orders-loading">
        <div className="loading-spinner">⏳</div>
        <p>Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <h1>📦 My Orders</h1>
          <p className="orders-subtext">Track and manage your orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-icon">📭</div>
            <h2>No Orders Yet</h2>
            <p>You haven't placed any orders yet.</p>
            <button className="shop-now-btn" onClick={() => navigate('/shop')}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order._id.slice(-8).toUpperCase()}</h3>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="order-status" style={{ borderColor: getStatusColor(order.status) }}>
                    <span className="status-icon">{getStatusIcon(order.status)}</span>
                    <span className="status-text">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                  </div>
                </div>

                <div className="order-items">
                  <h4>Items</h4>
                  {order.items && order.items.map((item, idx) => (
                    <div key={idx} className="order-item">
                      <span className="item-name">
                        {item.productName || 'Product'}
                      </span>
                      <span className="item-qty">Qty: {item.quantity}</span>
                      <span className="item-price">₹{item.priceAtPurchase}</span>
                    </div>
                  ))}
                </div>

                <div className="order-footer">
                  <div className="order-total">
                    <span>Total Amount</span>
                    <span className="total-price">₹{order.totalAmount || order.totalPrice || 0}</span>
                  </div>
                  <button className="track-btn" onClick={() => alert('Tracking details: ' + order.status)}>
                    🚚 Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
