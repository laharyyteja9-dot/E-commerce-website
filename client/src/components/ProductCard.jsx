import { useState } from 'react';
import './ProductCard.css';

export default function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    setQuantity(1);
  };

  const handleQuantityChange = (value) => {
    if (value > 0 && value <= (product.stock || 100)) {
      setQuantity(value);
    }
  };

  const isOutOfStock = product.stock <= 0;

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image || 'https://via.placeholder.com/250x200?text=Product'} 
          alt={product.name}
          className="product-image"
        />
        {product.discount > 0 && (
          <div className="discount-badge">{product.discount}% OFF</div>
        )}
      </div>

      <div className="product-info">
        <div className="product-category">{product.category || 'General'}</div>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-pricing">
          <div className="price-group">
            <span className="current-price">₹{product.price}</span>
            {product.originalPrice && (
              <span className="original-price">₹{product.originalPrice}</span>
            )}
          </div>
          {product.stock > 0 && (
            <div className="stock-info">
              ✓ {product.stock} in stock
            </div>
          )}
        </div>

        <div className="product-actions">
          {!isOutOfStock ? (
            <>
              <div className="quantity-control">
                <button 
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="qty-btn"
                >
                  −
                </button>
                <span className="qty-display">{quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="qty-btn"
                >
                  +
                </button>
              </div>
              <button 
                className="add-to-cart-btn"
                onClick={handleAddToCart}
              >
                🛒 Add
              </button>
            </>
          ) : (
            <button className="out-of-stock-btn" disabled>
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
