import React, { useState } from 'react';
import { GroupOrderProvider } from './contexts/GroupOrderContext';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Cart from './components/Cart/Cart';
import CreateOrderModal from './components/GroupOrder/CreateOrderModal';
import JoinOrderModal from './components/GroupOrder/JoinOrderModal';
import Receipt from './components/GroupOrder/Receipt';
import './App.css';

// Updated Menu data
const menuData = {
  "Fried Rice & Noodles": [
    { id: 1, name: "Vegetable Fried Rice", price: 12.00 },
    { id: 2, name: "Roast Pork Fried Rice", price: 12.00 },
    { id: 3, name: "Chicken Fried Rice", price: 12.00 },
    { id: 4, name: "Beef Fried Rice", price: 13.00 },
    { id: 5, name: "Shrimp Fried Rice", price: 13.00 },
    { id: 6, name: "Vegetable Lo Mein", price: 12.00 },
    { id: 7, name: "Roast Pork Lo Mein", price: 12.00 },
    { id: 8, name: "Chicken Lo Mein", price: 12.00 },
    { id: 9, name: "Beef Lo Mein", price: 13.00 },
    { id: 10, name: "Shrimp Lo Mein", price: 13.00 },
    { id: 11, name: "Beef Chow Fun (Dry or with Gravy)", price: 12.00 },
    { id: 12, name: "Singapore Rice Noodle (Shrimp, Pork Curry Flavor)", price: 13.00 },
    { id: 13, name: "Wonton Noodle Soup", price: 12.00 },
    { id: 14, name: "Roast Pork Noodle Soup", price: 12.00 },
    { id: 15, name: "Roast Duck Noodle Soup", price: 16.00 }
  ],
  "Main Dishes": [
    { id: 16, name: "Tofu with Mixed Vegetables", price: 12.00 },
    { id: 17, name: "Broccoli with Garlic Sauce", price: 12.00 },
    { id: 18, name: "Eggplant with Garlic Sauce", price: 12.00 },
    { id: 19, name: "String Beans with Garlic Sauce", price: 12.00 },
    { id: 20, name: "Chicken with Broccoli", price: 14.00 },
    { id: 21, name: "Beef with Broccoli", price: 16.00 },
    { id: 22, name: "Shrimp with Broccoli", price: 16.00 },
    { id: 23, name: "Chicken with Mixed Vegetables", price: 14.00 },
    { id: 24, name: "Beef with Mixed Vegetables", price: 16.00 },
    { id: 25, name: "Shrimp with Mixed Vegetables", price: 16.00 },
    { id: 26, name: "Chicken with Garlic Sauce", price: 14.00 },
    { id: 27, name: "Beef with Garlic Sauce", price: 16.00 },
    { id: 28, name: "Shrimp with Garlic Sauce", price: 16.00 },
    { id: 29, name: "Kung Po Chicken with Peanut", price: 14.00 },
    { id: 30, name: "Sweet & Sour Chicken", price: 14.00 },
    { id: 31, name: "Curry Chicken", price: 14.00 },
    { id: 32, name: "General Tso Chicken", price: 16.00 },
    { id: 33, name: "Sesame Chicken", price: 16.00 },
    { id: 34, name: "Mango Crispy Chicken", price: 16.00 },
    { id: 35, name: "Wok Seared Salmon with Garlic Sauce", price: 16.00 },
    { id: 36, name: "Seared Mahi Szechuan Style", price: 16.00 }
  ]
};

function App() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const handleAddToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const handleRemoveFromCart = (index) => {
    const newItems = cartItems.filter((_, i) => i !== index);
    setCartItems(newItems);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <GroupOrderProvider>
      <div className="App">
        <Header />
        <div className="main-content">
          <div className="buttons">
            <button className="create-order-btn" onClick={() => setShowCreateModal(true)}>
              Create Group Order
            </button>
            <button className="join-order-btn" onClick={() => setShowJoinModal(true)}>
              Join Group Order
            </button>
          </div>
          
          <div className="content-wrapper">
            <Menu menuData={menuData} onAddToCart={handleAddToCart} />
            <Cart 
              items={cartItems} 
              onRemove={handleRemoveFromCart}
              onShowReceipt={() => setShowReceipt(true)}
              onClearCart={clearCart}
            />
          </div>
        </div>

        {showCreateModal && (
          <CreateOrderModal onClose={() => setShowCreateModal(false)} />
        )}
        
        {showJoinModal && (
          <JoinOrderModal onClose={() => setShowJoinModal(false)} />
        )}

        {showReceipt && (
          <Receipt onClose={() => setShowReceipt(false)} />
        )}
      </div>
    </GroupOrderProvider>
  );
}

export default App;
