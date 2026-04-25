import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { api } from '../services/api';
import ProductCard from '../components/ProductCard';
import Categories from '../components/Categories';
import Cart from '../components/Cart';
import './Shop.css';

export default function Shop() {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Get unique categories from products
  const categories = [...new Set(products.map(p => p.category || 'Other'))];

  useEffect(() => {
    fetchProducts();
    // Listen for cart updates from ProductCard or Cart component
    window.addEventListener('cartUpdate', handleCartUpdate);
    return () => window.removeEventListener('cartUpdate', handleCartUpdate);
  }, []);

  const handleCartUpdate = (e) => {
    setCart(e.detail);
  };

  useEffect(() => {
    filterProducts();
  }, [products, selectedCategory, searchQuery]);

  const fetchProducts = async () => {
    try {
      const data = await api.getProducts();
      setProducts(data || []);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => (p.category || 'Other') === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product, quantity) => {
    const existingItem = cart.find(item => item._id === product._id);
    
    if (existingItem) {
      // Update quantity if product already in cart
      const updatedCart = cart.map(item =>
        item._id === product._id
          ? { ...item, quantity: (item.quantity || 1) + quantity }
          : item
      );
      setCart(updatedCart);
    } else {
      // Add new product to cart
      setCart([...cart, { ...product, quantity }]);
    }
  };

  const handleCheckout = async (cartItems) => {
    if (!user) {
      alert('Please login to checkout');
      return;
    }

    const order = {
      userId: user.id,
      status: 'pending',
      items: cartItems.map(p => ({
        productId: p._id,
        quantity: p.quantity || 1,
        priceAtPurchase: p.price
      })),
      totalAmount: cartItems.reduce((sum, p) => sum + (p.price * (p.quantity || 1)), 0)
    };

    try {
      await api.createOrder(order);
      setCart([]);
      setShowCart(false);
      alert('Order placed successfully! ✓');
    } catch (error) {
      console.error('Failed to place order', error);
      throw error;
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);

  return (
    <div className="shop">
      {/* Categories Filter */}
      <Categories
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Products Section */}
      <div className="shop-container">
        <div className="products-section">
          <div className="section-header">
            <h2>
              {selectedCategory === 'all'
                ? 'All Products'
                : selectedCategory}
            </h2>
            <span className="product-count">
              {filteredProducts.length} items found
            </span>
          </div>

          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner">⏳</div>
              <p>Loading products...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📦</div>
              <p>No products found</p>
              <p className="empty-hint">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map(product => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Cart Drawer */}
      {showCart && (
        <Cart
          cartItems={cart}
          onClose={() => setShowCart(false)}
          onCheckout={handleCheckout}
          user={user}
        />
      )}

      {/* Cart Floating Button (mobile) */}
      {cartCount > 0 && (
        <button
          className="floating-cart-btn"
          onClick={() => setShowCart(true)}
        >
          <span className="cart-icon">🛒</span>
          <span className="cart-badge">{cartCount}</span>
          <span className="cart-label">View Cart</span>
        </button>
      )}
    </div>
  );
}
