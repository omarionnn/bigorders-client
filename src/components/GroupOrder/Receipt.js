import React from 'react';
import { useGroupOrder } from '../../contexts/GroupOrderContext';
import './GroupOrder.css';

const Receipt = ({ onClose }) => {
  const { activeGroupOrder } = useGroupOrder();

  if (!activeGroupOrder) {
    return null;
  }

  // Calculate totals for each participant
  const participantTotals = {};
  activeGroupOrder.orders?.forEach(order => {
    if (!participantTotals[order.userName]) {
      participantTotals[order.userName] = {
        items: [],
        total: 0
      };
    }
    order.items.forEach(item => {
      participantTotals[order.userName].items.push(item);
      participantTotals[order.userName].total += item.price;
    });
  });

  const grandTotal = Object.values(participantTotals).reduce(
    (sum, participant) => sum + participant.total,
    0
  );

  return (
    <div className="modal-overlay">
      <div className="modal receipt-modal">
        <h2>Order Receipt</h2>
        <p className="pin-info">Group Order PIN: {activeGroupOrder.pin}</p>
        
        <div className="participants">
          <h3>Orders by Participant:</h3>
          {Object.entries(participantTotals).map(([name, data], index) => (
            <div key={index} className="participant-order">
              <h4>{name}'s Order:</h4>
              <ul>
                {data.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {item.name} - ${item.price.toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className="participant-total">
                Subtotal: ${data.total.toFixed(2)}
              </p>
            </div>
          ))}
        </div>

        <div className="receipt-total">
          <h3>Grand Total: ${grandTotal.toFixed(2)}</h3>
        </div>

        <div className="modal-actions">
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default Receipt; 