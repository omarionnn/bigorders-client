import React, { useState } from 'react';
import { useGroupOrder } from '../../contexts/GroupOrderContext';
import './GroupOrder.css';

const JoinOrderModal = ({ onClose }) => {
  const [pin, setPin] = useState('');
  const [userName, setUserName] = useState('');
  const { joinGroupOrder } = useGroupOrder();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await joinGroupOrder(pin, userName);
      alert('Successfully joined group order!');
      onClose();
    } catch (error) {
      alert('Error joining group order: ' + error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Join Group Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>PIN:</label>
            <input
              type="text"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Your Name:</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit">Join Order</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinOrderModal;
