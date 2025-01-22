import React, { useEffect, useState } from 'react';
import { useGroupOrder } from '../../contexts/GroupOrderContext';
import './Menu.css';

const Menu = ({ onAddToCart }) => {
  const [menu, setMenu] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { fetchMenu } = useGroupOrder();

  useEffect(() => {
    const loadMenu = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log('Fetching menu...');
        const menuData = await fetchMenu();
        console.log('Menu data received:', menuData);
        setMenu(menuData);
      } catch (err) {
        console.error('Error loading menu:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, [fetchMenu]);

  if (loading) return <div>Loading menu...</div>;
  if (error) return <div className="error-message">Error loading menu: {error}</div>;

  return (
    <div className="menu">
      {Object.entries(menu).map(([category, items]) => (
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