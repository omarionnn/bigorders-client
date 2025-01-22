import React from 'react';
import { useGroupOrder } from '../../contexts/GroupOrderContext';
import './Cart.css';

const Cart = ({ items, onRemove, onClearCart }) => {
  const { activeGroupOrder, addToGroupOrder } = useGroupOrder();
  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleSubmitOrder = async () => {
    try {
      await addToGroupOrder(items);
      onClearCart(); // Clear cart after successful submission
      alert('Order added to group order!');
    } catch (error) {
      alert('Error adding order: ' + error.message);
    }
  };

  return (
    <div className="cart">
      <h2>Your cart</h2>
      {items.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item, index) => (
              <div key={index} className="cart-item">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
                <button onClick={() => onRemove(index)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="cart-total">
            <strong>Total: ${total.toFixed(2)}</strong>
          </div>
          <div className="cart-actions">
            {activeGroupOrder && (
              <button onClick={handleSubmitOrder} className="submit-order-btn">
                Submit Order
              </button>
            )}
            <button onClick={onClearCart} className="clear-cart-btn">
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 