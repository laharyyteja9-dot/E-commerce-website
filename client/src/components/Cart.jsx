import { useState } from 'react';
import './Cart.css';

export default function Cart({ cartItems, onClose, onCheckout, user }) {
  const [isProcessing, setIsProcessing] = useState(false);

  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    window.dispatchEvent(new CustomEvent('cartUpdate', { detail: updatedCart }));
  };

  const updateQuantity = (index, quantity) => {
    if (quantity <= 0) {
      removeFromCart(index);
      return;
    }
    const updatedCart = cartItems.map((item, i) => 
      i === index ? { ...item, quantity } : item
    );
    window.dispatchEvent(new CustomEvent('cartUpdate', { detail: updatedCart }));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const handleCheckout = async () => {
    if (!user) {
      alert('Please login to checkout');
      return;
    }

    setIsProcessing(true);
    try {
      await onCheckout(cartItems);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Checkout failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <p>Your cart is empty</p>
            <p className="empty-hint">Add items to get started!</p>
            <button className="continue-shopping-btn" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                  <img 
                    src={item.image || 'https://via.placeholder.com/60x60?text=Item'} 
                    alt={item.name}
                    className="cart-item-image"
                  />
                  <div className="cart-item-details">
                    <h4>{item.name}</h4>
                    <p className="item-price">₹{item.price}</p>
                  </div>
                  <div className="cart-item-quantity">
                    <button onClick={() => updateQuantity(index, (item.quantity || 1) - 1)}>−</button>
                    <span>{item.quantity || 1}</span>
                    <button onClick={() => updateQuantity(index, (item.quantity || 1) + 1)}>+</button>
                  </div>
                  <div className="cart-item-total">
                    ₹{item.price * (item.quantity || 1)}
                  </div>
                  <button 
                    className="remove-btn"
                    onClick={() => removeFromCart(index)}
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Items ({totalItems})</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span className="free-delivery">FREE</span>
              </div>
              <div className="summary-row highlight">
                <span>Total</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              {!user && (
                <p className="login-prompt">👉 Login to proceed to checkout</p>
              )}
            </div>

            <button 
              className="checkout-btn"
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
