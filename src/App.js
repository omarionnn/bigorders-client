import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CartProvider } from './contexts/CartContext';
import { GroupOrderProvider } from './contexts/GroupOrderContext';
import Cart from './components/Cart';
import MenuItem from './components/MenuItem';
import GroupOrder from './components/GroupOrder/GroupOrder';
import './App.css';

function App() {
  const [menuItems, setMenuItems] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Updated port to 3003
    axios.get('http://localhost:3003/api/menu')
      .then(response => {
        console.log('Menu data:', response.data);
        setMenuItems(response.data);
      })
      .catch(err => {
        console.error('Error fetching menu:', err);
        setError(err.message);
      });
  }, []);

  return (
    <GroupOrderProvider>
      <CartProvider>
        <div className="App">
          <header className="App-header">
            <h1>BigOrders</h1>
            <h2>Rain Albany Restaurant</h2>
          </header>
          
          <main>
            <GroupOrder />
            <div className="content-wrapper">
              {error && (
                <div className="error-message">
                  Error loading menu: {error}
                </div>
              )}
              
              <div className="menu-and-cart">
                <div className="menu-section">
                  {menuItems && (
                    <div className="menu-container">
                      {menuItems.categories.map(category => (
                        <div key={category.name} className="menu-category">
                          <h3>{category.name}</h3>
                          <div className="menu-items">
                            {category.items.map(item => (
                              <MenuItem key={item.id} item={item} />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Cart />
              </div>
            </div>
          </main>
        </div>
      </CartProvider>
    </GroupOrderProvider>
  );
}

export default App;
