import React from 'react';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-container empty">
        <h3>Your cart is empty</h3>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h3>Your Order</h3>
      <div className="cart-items">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <div className="item-info">
              <h4>{item.name}</h4>
              <p className="price">${(item.price * item.quantity).toFixed(2)}</p>
            </div>
            <div className="item-controls">
              <button 
                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                className="quantity-btn"
              >
                -
              </button>
              <span className="quantity">{item.quantity}</span>
              <button 
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="quantity-btn"
              >
                +
              </button>
              <button 
                onClick={() => removeFromCart(item)}
                className="remove-btn"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-footer">
        <div className="cart-total">
          <h4>Total: ${getCartTotal().toFixed(2)}</h4>
        </div>
        <div className="cart-actions">
          <button onClick={clearCart} className="clear-btn">
            Clear Cart
          </button>
          <button className="checkout-btn">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart; 