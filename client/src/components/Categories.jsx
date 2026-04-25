import './Categories.css';

export default function Categories({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="categories-section">
      <h3>Categories</h3>
      <div className="categories-grid">
        <button
          className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => onSelectCategory('all')}
        >
          <span className="category-icon">🏪</span>
          <span>All Products</span>
        </button>
        
        {categories.map((category) => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            <span className="category-icon">{getCategoryIcon(category)}</span>
            <span>{category}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function getCategoryIcon(category) {
  const icons = {
    'Groceries': '🥬',
    'Fruits': '🍎',
    'Vegetables': '🥕',
    'Dairy': '🥛',
    'Bakery': '🥐',
    'Snacks': '🍿',
    'Beverages': '🧃',
    'Personal Care': '🧴',
    'Other': '📦',
  };
  return icons[category] || '📦';
}
