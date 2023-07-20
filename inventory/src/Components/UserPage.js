import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const UserPage = () => {
  const [userId, setUserId] = useState('');
  const [items, setItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch items from the database when the component mounts
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch(`http://localhost:3030/items`);
      if (response.ok) {
        const data = await response.json();
        setItems(data);
      } else {
        console.error('Failed to fetch items');
      }
    } catch (error) {
      console.error('An error occurred while fetching items:', error);
    }
  };
  const handleLogout = () => {
    // Clear the user's token from cookies
    Cookies.remove('token');

    // Redirect to the login page
    navigate('/');
  };

  return (
    <div className="user-page">
      <h2>Welcome {userId}</h2>
      <div className="items-container">
        {items.map((item) => (
          <div key={item.id}>
            <h3>Item Name: {item.item_name}</h3>
            <p>Id: {item.id}</p>
            <p>Description: {item.description}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        ))}
      </div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserPage;