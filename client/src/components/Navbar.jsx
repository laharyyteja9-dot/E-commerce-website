import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './index.css';

export default function Navbar({ onAuthClick, cartCount = 0, onCartClick, searchQuery, onSearchChange }) {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-brand" onClick={() => navigate('/')}>
          <div className="logo-icon">⚡</div>
          <span>QuickShop</span>
        </div>

        {/* Search Bar */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search products, brands..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
          <button className="search-btn">🔍</button>
        </div>

        {/* Right Section */}
        <div className="navbar-right">
          {user && <a href="/orders" className="nav-link">📦 Orders</a>}
          
          <button className="cart-btn" onClick={onCartClick}>
            🛒
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {user ? (
            <div className="user-menu">
              <button 
                className="user-btn"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                👤 {user.name.split(' ')[0]}
              </button>
              {showUserMenu && (
                <div className="user-dropdown">
                  <button onClick={() => navigate('/profile')} className="dropdown-item">
                    👤 My Profile
                  </button>
                  <button onClick={() => navigate('/orders')} className="dropdown-item">
                    📦 My Orders
                  </button>
                  {user.role === 'admin' && (
                    <button onClick={() => navigate('/analytics')} className="dropdown-item">
                      📊 Analytics
                    </button>
                  )}
                  <button onClick={handleLogout} className="dropdown-item logout-item">
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button className="login-btn" onClick={onAuthClick}>
              Login / Register
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
