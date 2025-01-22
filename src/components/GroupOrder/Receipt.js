import React from 'react';
import './Receipt.css';

const TAX_RATE = 0.08875; // 8.875% tax rate

const Receipt = ({ groupOrder, onClose }) => {
  console.log('Receipt groupOrder:', groupOrder); // Debug log

  // Calculate totals for each user and overall
  const calculateTotals = () => {
    const userTotals = {};
    let subtotal = 0;

    // Debug logs
    console.log('Orders:', groupOrder.orders);
    console.log('Participants:', groupOrder.participants);

    groupOrder.orders.forEach(order => {
      // Find the participant name for this order
      const participant = groupOrder.participants.find(p => p.id === order.userId);
      const userName = participant ? participant.name : 'Unknown User';
      console.log('Processing order for:', userName, order); // Debug log

      if (!userTotals[userName]) {
        userTotals[userName] = {
          items: [],
          subtotal: 0
        };
      }

      order.items.forEach(item => {
        userTotals[userName].items.push(item);
        userTotals[userName].subtotal += item.price;
        subtotal += item.price;
      });
    });

    const tax = subtotal * TAX_RATE;
    const grandTotal = subtotal + tax;

    console.log('Calculated totals:', { userTotals, subtotal, tax, grandTotal }); // Debug log
    return { userTotals, subtotal, tax, grandTotal };
  };

  const { userTotals, subtotal, tax, grandTotal } = calculateTotals();

  return (
    <div className="receipt-modal">
      <div className="receipt-content">
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <div className="receipt-header">
          <h2>BigOrders Global Receipt</h2>
          <p>Order PIN: {groupOrder.pin}</p>
          <p>Date: {new Date().toLocaleDateString()}</p>
          <p>Total Participants: {groupOrder.participants.length}</p>
        </div>

        <div className="receipt-body">
          {Object.entries(userTotals).map(([userName, data]) => (
            <div key={userName} className="user-order">
              <h3>{userName}'s Order</h3>
              <ul>
                {data.items.map((item, index) => (
                  <li key={index} className="receipt-item">
                    <span className="item-name">{item.name}</span>
                    <span className="item-price">${item.price.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <div className="user-total">
                Subtotal: ${data.subtotal.toFixed(2)}
              </div>
            </div>
          ))}
          
          {/* Show if no orders yet */}
          {Object.keys(userTotals).length === 0 && (
            <p className="no-orders">No orders have been added yet.</p>
          )}
        </div>

        <div className="receipt-footer">
          <div className="order-summary">
            <p>Total Participants: {groupOrder.participants.length}</p>
            <p>Total Orders: {groupOrder.orders.length}</p>
          </div>
          <div className="totals">
            <div className="subtotal">
              <span>Subtotal:</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="tax">
              <span>Tax (8.875%):</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className="grand-total">
              <h3>Grand Total:</h3>
              <h3>${grandTotal.toFixed(2)}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Receipt; 