import React, { useState } from 'react';
import { GroupOrderProvider } from './contexts/GroupOrderContext';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Cart from './components/Cart/Cart';
import CreateOrderModal from './components/GroupOrder/CreateOrderModal';
import JoinOrderModal from './components/GroupOrder/JoinOrderModal';
import Receipt from './components/GroupOrder/Receipt';
import './App.css';

// Menu data
const menuData = {
  "Fried Rice & Noodles": [
    { id: 1, name: "House Special Fried Rice", price: 12.95 },
    { id: 2, name: "Shrimp Fried Rice", price: 12.95 },
    { id: 3, name: "Chicken Fried Rice", price: 11.95 },
    { id: 4, name: "Beef Fried Rice", price: 11.95 },
    { id: 5, name: "Vegetable Fried Rice", price: 10.95 },
    { id: 6, name: "House Special Lo Mein", price: 12.95 },
    { id: 7, name: "Shrimp Lo Mein", price: 12.95 },
    { id: 8, name: "Chicken Lo Mein", price: 11.95 },
    { id: 9, name: "Beef Lo Mein", price: 11.95 },
    { id: 10, name: "Vegetable Lo Mein", price: 10.95 }
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
