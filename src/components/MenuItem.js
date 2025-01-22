import React from 'react';
import { useCart } from '../contexts/CartContext';

const MenuItem = ({ item }) => {
  const { addToCart } = useCart();

  return (
    <div className="menu-item">
      <h4>{item.name}</h4>
      <p className="description">{item.description}</p>
      <p className="price">${item.price.toFixed(2)}</p>
      {item.dietaryTags && (
        <div className="dietary-tags">
          {item.dietaryTags.map(tag => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
      <button 
        className="add-to-cart"
        onClick={() => addToCart(item)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default MenuItem; 