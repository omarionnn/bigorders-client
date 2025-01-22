import React, { useState } from 'react';
import { useGroupOrder } from '../../contexts/GroupOrderContext';
import { useCart } from '../../contexts/CartContext';
import Receipt from './Receipt';
import './GroupOrder.css';

const GroupOrder = () => {
  const [pin, setPin] = useState('');
  const [userName, setUserName] = useState('');
  const [hostName, setHostName] = useState('');
  const [showJoinForm, setShowJoinForm] = useState(false);
  const [showHostForm, setShowHostForm] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [error, setError] = useState(null);
  
  const { 
    activeGroupOrder,
    participants,
    isHost,
    createGroupOrder,
    joinGroupOrder,
    addToGroupOrder,
    finalizeGroupOrder
  } = useGroupOrder();
  
  const { cart, clearCart } = useCart();

  const handleCreateOrder = async () => {
    try {
      if (!hostName.trim()) {
        setError('Please enter your name');
        return;
      }
      setError(null);
      const newPin = await createGroupOrder(hostName);
      console.log('Group order created with PIN:', newPin);
      setShowHostForm(false);
      alert(`Group order created! Share this PIN: ${newPin}`);
    } catch (error) {
      console.error('Error details:', error);
      setError(error.message || 'Error creating group order');
    }
  };

  const handleJoinOrder = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      const success = await joinGroupOrder(pin, userName);
      if (success) {
        alert('Successfully joined group order!');
        setShowJoinForm(false);
      } else {
        setError('Invalid PIN');
      }
    } catch (error) {
      setError(error.message || 'Error joining group order');
    }
  };

  const handleSubmitOrder = async () => {
    try {
      if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
      }
      
      if (!activeGroupOrder) {
        alert('No active group order!');
        return;
      }

      const currentUser = isHost ? hostName : userName;
      const userId = participants.find(p => p.name === currentUser)?.id;
      
      if (!userId) {
        alert('User not found in participants!');
        return;
      }

      await addToGroupOrder(cart, userId);
      clearCart();
      alert('Your order has been added to the group order!');
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('Error adding order: ' + (error.message || 'Unknown error'));
    }
  };

  const handleFinalizeOrder = async () => {
    try {
      await finalizeGroupOrder();
      alert('Group order has been finalized!');
    } catch (error) {
      alert('Error finalizing order: ' + (error.message || 'Unknown error'));
    }
  };

  const handleShowReceipt = () => {
    setShowReceipt(true);
  };

  return (
    <div className="group-order">
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      {!activeGroupOrder ? (
        <div className="group-order-actions">
          {!showHostForm && !showJoinForm && (
            <>
              <button onClick={() => setShowHostForm(true)}>Create Group Order</button>
              <button onClick={() => setShowJoinForm(true)}>Join Group Order</button>
            </>
          )}
          
          {showHostForm && (
            <form onSubmit={(e) => { e.preventDefault(); handleCreateOrder(); }} className="host-form">
              <input
                type="text"
                placeholder="Enter Your Name"
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                required
              />
              <button type="submit">Create Order</button>
              <button type="button" onClick={() => setShowHostForm(false)}>Cancel</button>
            </form>
          )}
          
          {showJoinForm && (
            <form onSubmit={handleJoinOrder} className="join-form">
              <input
                type="text"
                placeholder="Enter PIN"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Your Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
              <button type="submit">Join</button>
              <button type="button" onClick={() => setShowJoinForm(false)}>Cancel</button>
            </form>
          )}
        </div>
      ) : (
        <div className="active-group-order">
          <h3>Group Order Active</h3>
          <p>PIN: {activeGroupOrder.pin}</p>
          <p>Your Name: {isHost ? hostName : userName}</p>
          
          <div className="participants">
            <h4>Participants:</h4>
            <ul>
              {participants.map(participant => (
                <li key={participant.id}>{participant.name}</li>
              ))}
            </ul>
          </div>
          
          <button 
            onClick={handleSubmitOrder}
            className="add-order-btn"
            disabled={cart.length === 0}
          >
            Add My Order
          </button>
          
          {isHost && (
            <div className="host-actions">
              <button 
                onClick={handleShowReceipt}
                className="receipt-btn"
              >
                Generate Global Receipt
              </button>
              
              <button 
                onClick={handleFinalizeOrder}
                className="finalize-btn"
              >
                Finalize Group Order
              </button>
            </div>
          )}

          {showReceipt && (
            <Receipt 
              groupOrder={activeGroupOrder}
              onClose={() => setShowReceipt(false)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default GroupOrder; 