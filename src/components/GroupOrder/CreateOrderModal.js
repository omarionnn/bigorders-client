import React, { useState } from 'react';
import { useGroupOrder } from '../../contexts/GroupOrderContext';
import './GroupOrder.css';

const CreateOrderModal = ({ onClose }) => {
  const [hostName, setHostName] = useState('');
  const { createGroupOrder } = useGroupOrder();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pin = await createGroupOrder(hostName);
      alert(`Group order created! Your PIN is: ${pin}`);
      onClose();
    } catch (error) {
      alert('Error creating group order: ' + error.message);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Create Group Order</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your Name:</label>
            <input
              type="text"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              required
            />
          </div>
          <div className="modal-actions">
            <button type="submit">Create Order</button>
            <button type="button" onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateOrderModal;
