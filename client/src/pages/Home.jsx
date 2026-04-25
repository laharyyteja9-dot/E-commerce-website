import { useNavigate } from 'react-router-dom';
import './Home.css';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Hero Banner */}
      <section className="hero-banner">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Fresh Products, Doorstep Delivery</h1>
            <p>Get groceries & essentials delivered in 10 minutes</p>
            <button className="hero-cta" onClick={() => navigate('/shop')}>
              🛒 Shop Now
            </button>
          </div>
          <div className="hero-image">
            <div className="hero-placeholder">📦</div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="quick-stats">
        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-info">
            <h3>10 Min Delivery</h3>
            <p>Express delivery service</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>Best Prices</h3>
            <p>Competitive & transparent pricing</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🛒</div>
          <div className="stat-info">
            <h3>1000+ Items</h3>
            <p>Wide selection of products</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>Verified Products</h3>
            <p>Quality assured items</p>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="featured-categories">
        <h2>Shop by Category</h2>
        <div className="categories-carousel">
          <div className="category-card" onClick={() => navigate('/shop')}>
            <div className="category-icon">🥬</div>
            <p>Fresh Vegetables</p>
          </div>
          <div className="category-card" onClick={() => navigate('/shop')}>
            <div className="category-icon">🍎</div>
            <p>Fruits</p>
          </div>
          <div className="category-card" onClick={() => navigate('/shop')}>
            <div className="category-icon">🥛</div>
            <p>Dairy & Eggs</p>
          </div>
          <div className="category-card" onClick={() => navigate('/shop')}>
            <div className="category-icon">🥐</div>
            <p>Bakery</p>
          </div>
          <div className="category-card" onClick={() => navigate('/shop')}>
            <div className="category-icon">🍿</div>
            <p>Snacks</p>
          </div>
          <div className="category-card" onClick={() => navigate('/shop')}>
            <div className="category-icon">🧴</div>
            <p>Personal Care</p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-choose-us">
        <h2>Why Choose QuickShop?</h2>
        <div className="features-grid">
          <div className="feature-item">
            <div className="feature-number">1</div>
            <h3>Instant Delivery</h3>
            <p>Get your groceries in just 10 minutes with our express delivery system</p>
          </div>
          <div className="feature-item">
            <div className="feature-number">2</div>
            <h3>Fresh & Quality</h3>
            <p>All products are carefully selected and verified for quality</p>
          </div>
          <div className="feature-item">
            <div className="feature-number">3</div>
            <h3>Easy Checkout</h3>
            <p>Simple, secure, and fast checkout process</p>
          </div>
          <div className="feature-item">
            <div className="feature-number">4</div>
            <h3>Track Orders</h3>
            <p>Real-time order tracking and live delivery updates</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Shop?</h2>
          <p>Explore thousands of fresh products now</p>
          <button className="cta-button" onClick={() => navigate('/shop')}>
            Browse Products
          </button>
        </div>
      </section>
    </div>
  );
}
