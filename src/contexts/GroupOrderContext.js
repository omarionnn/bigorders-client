import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Create a constant for the API URL
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://bigorders-api.onrender.com'
  : 'http://localhost:3003';

const GroupOrderContext = createContext();

export const GroupOrderProvider = ({ children }) => {
  const [activeGroupOrder, setActiveGroupOrder] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isHost, setIsHost] = useState(false);

  // Function to fetch the latest group order state
  const refreshGroupOrder = async (pin) => {
    try {
      const response = await axios.get(`${API_URL}/api/group-orders/${pin}`);
      if (response.data) {
        setActiveGroupOrder(response.data);
        setParticipants(response.data.participants);
      }
    } catch (error) {
      console.error('Error refreshing group order:', error);
    }
  };

  const createGroupOrder = async (hostName) => {
    try {
      console.log('Creating group order with host:', hostName);
      const response = await axios.post(`${API_URL}/api/group-orders`, {
        hostName
      });
      
      if (response.data && response.data.groupOrder) {
        console.log('Group order created successfully:', response.data);
        setActiveGroupOrder(response.data.groupOrder);
        setParticipants(response.data.groupOrder.participants);
        setIsHost(true);
        return response.data.pin;
      } else {
        throw new Error('Invalid server response');
      }
    } catch (error) {
      console.error('Error creating group order:', error);
      throw error;
    }
  };

  const joinGroupOrder = async (pin, userName) => {
    try {
      console.log('Attempting to join group order:', { pin, userName });
      
      if (!pin || !userName) {
        throw new Error('PIN and name are required');
      }

      const response = await axios.post(`${API_URL}/api/group-orders/join`, {
        pin: pin.toString(),  // Ensure PIN is a string
        userName
      });
      
      console.log('Join response:', response.data);
      
      if (response.data && response.data.groupOrder) {
        setActiveGroupOrder(response.data.groupOrder);
        setParticipants(response.data.groupOrder.participants);
        setIsHost(false);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error joining group order:', error);
      if (error.response && error.response.status === 404) {
        throw new Error('Invalid PIN');
      }
      throw error;
    }
  };

  const addToGroupOrder = async (items, userId) => {
    if (activeGroupOrder) {
      try {
        console.log('Adding order for user:', userId, 'items:', items);
        const response = await axios.post(
          `${API_URL}/api/group-orders/${activeGroupOrder.pin}/orders`,
          { userId, items }
        );
        
        if (response.data) {
          setActiveGroupOrder(response.data);
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error adding to order:', error);
        throw error;
      }
    }
  };

  const finalizeGroupOrder = async () => {
    if (activeGroupOrder && isHost) {
      try {
        console.log('Finalizing group order:', activeGroupOrder);
        setActiveGroupOrder(null);
        setParticipants([]);
        setIsHost(false);
      } catch (error) {
        console.error('Error finalizing group order:', error);
        throw error;
      }
    }
  };

  return (
    <GroupOrderContext.Provider value={{
      activeGroupOrder,
      participants,
      isHost,
      createGroupOrder,
      joinGroupOrder,
      addToGroupOrder,
      finalizeGroupOrder,
      refreshGroupOrder
    }}>
      {children}
    </GroupOrderContext.Provider>
  );
};

export const useGroupOrder = () => useContext(GroupOrderContext); 