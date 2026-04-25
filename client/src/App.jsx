import { useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Orders from './pages/Orders';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import AuthModal from './components/AuthModal';
import './App.css';

function AppRoutes() {
  const { user } = useContext(AuthContext);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);

  const openAuthModal = (mode = 'login') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="app">
      <Navbar 
        onAuthClick={() => openAuthModal('login')}
        cartCount={cartCount}
        onCartClick={() => setShowCart(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/profile" element={user ? <Profile /> : <Home />} />
          <Route path="/analytics" element={user && user.role === 'admin' ? <Analytics /> : <Home />} />
        </Routes>
      </main>
      {showAuthModal && (
        <AuthModal 
          mode={authMode} 
          onClose={closeAuthModal}
          onSwitchMode={(mode) => setAuthMode(mode)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
