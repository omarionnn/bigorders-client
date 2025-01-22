import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Create a constant for the API URL
const API_URL = 'https://bigorders-api.onrender.com';

const GroupOrderContext = createContext();

export const GroupOrderProvider = ({ children }) => {
  const [activeGroupOrder, setActiveGroupOrder] = useState(null);
  const [participants, setParticipants] = useState([]);
  const [isHost, setIsHost] = useState(false);

  const fetchMenu = async () => {
    try {
      console.log('Fetching menu from:', `${API_URL}/api/menu`);
      const response = await axios.get(`${API_URL}/api/menu`, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });
      console.log('Menu response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching menu:', error);
      console.error('Error details:', error.response || error.message);
      throw new Error(`Error loading menu: ${error.message}`);
    }
  };

  const createGroupOrder = async (hostName) => {
    try {
      console.log('Creating group order:', hostName);
      const response = await axios.post(`${API_URL}/api/group-orders`, {
        hostName
      });
      console.log('Create response:', response.data);
      setActiveGroupOrder(response.data.groupOrder);
      setParticipants(response.data.groupOrder.participants);
      setIsHost(true);
      return response.data.pin;
    } catch (error) {
      console.error('Error creating group order:', error);
      throw error;
    }
  };

  const joinGroupOrder = async (pin, userName) => {
    try {
      console.log('Joining group order:', { pin, userName });
      const response = await axios.post(`${API_URL}/api/group-orders/join`, {
        pin,
        userName
      });
      console.log('Join response:', response.data);
      setActiveGroupOrder(response.data.groupOrder);
      setParticipants(response.data.groupOrder.participants);
      setIsHost(false);
      return true;
    } catch (error) {
      console.error('Error joining group order:', error);
      throw error;
    }
  };

  const addToGroupOrder = async (items) => {
    try {
      if (!activeGroupOrder) throw new Error('No active group order');
      console.log('Adding to order:', items);
      const response = await axios.post(
        `${API_URL}/api/group-orders/${activeGroupOrder.pin}/orders`,
        {
          userId: activeGroupOrder.participants.find(p => p.name === participants[0].name).id,
          items
        }
      );
      console.log('Add items response:', response.data);
      setActiveGroupOrder(response.data);
      return true;
    } catch (error) {
      console.error('Error adding to order:', error);
      throw error;
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
      fetchMenu,
      createGroupOrder,
      joinGroupOrder,
      addToGroupOrder,
      finalizeGroupOrder
    }}>
      {children}
    </GroupOrderContext.Provider>
  );
};

export const useGroupOrder = () => useContext(GroupOrderContext); 