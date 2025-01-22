import React from 'react';
import { useGroupOrder } from '../../contexts/GroupOrderContext';
import './GroupOrder.css';

const Receipt = ({ onClose }) => {
  const { activeGroupOrder } = useGroupOrder();

  if (!activeGroupOrder) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Order Receipt</h2>
        <div className="receipt-content">
          <p>Group Order PIN: {activeGroupOrder.pin}</p>
          <h3>Participants:</h3>
          <ul>
            {activeGroupOrder.participants.map((participant, index) => (
              <li key={index}>{participant.name}</li>
            ))}
          </ul>
          <h3>Orders:</h3>
          {activeGroupOrder.orders.map((order, index) => (
            <div key={index} className="order-item">
              <p>Ordered by: {order.userName}</p>
              <ul>
                {order.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {item.name} - ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="modal-actions">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Receipt; 