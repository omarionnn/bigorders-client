import React from 'react';
import './Menu.css';

const Menu = ({ menuData, onAddToCart }) => {
  if (!menuData) return <div>Loading menu...</div>;

  return (
    <div className="menu">
      {Object.entries(menuData).map(([category, items]) => (
        <div key={category} className="menu-category">
          <h2>{category}</h2>
          <div className="menu-items">
            {items.map((item) => (
              <div key={item.id} className="menu-item">
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="price">${item.price.toFixed(2)}</p>
                </div>
                <button 
                  onClick={() => onAddToCart(item)}
                  className="add-to-cart-btn"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu; 