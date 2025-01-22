import React from 'react';
import './Cart.css';

const Cart = ({ items, onRemove, onShowReceipt, onClearCart }) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

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
            <button onClick={onShowReceipt}>View Receipt</button>
            <button onClick={onClearCart}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart; 