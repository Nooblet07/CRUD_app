import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const UserPage = () => {
  const [username, setUsername] = useState('');
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const [showAddItemModal, setShowAddItemModal] = useState(false);

  useEffect(() => {
    // Fetch items from the database when the component mounts
    fetchItems();

    // Initialize the username state variable
    const token = Cookies.get('token');
    if (token) {
      fetchUsername(token);
    }
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch('http://localhost:3030/items');
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

  const fetchUsername = async (token) => {
    try {
      const response = await fetch(`http://localhost:3030/users/${token}`);
      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
      } else {
        console.error('Failed to fetch username');
      }
    } catch (error) {
      console.error('An error occurred while fetching username:', error);
    }
  };

  const handleLogout = () => {
    // Clear the user's token from cookies
    Cookies.remove('token');

    // Redirect to the login page
    navigate('/');
  };

  const handleAddItem = () => {
    setShowAddItemModal(true);
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`http://localhost:3030/items/${itemId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Failed to remove item');
      }
  
      // After successful removal, update the list of items by filtering out the removed item
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    } catch (error) {
      console.error('An error occurred while removing the item:', error);
    }
  };

  const handleUpdateItem = (itemId) => {
    // For simplicity, we'll just navigate to the update item page with the itemId as a parameter
    navigate(`/update-item/${itemId}`);
  };

  return (
    <div className="user-page">
      <h2>Welcome {username}</h2>
      <div className="items-container">
        {items.map((item) => (
          <div key={item.id}>
            <h3>Item Name: {item.item_name}</h3>
            <p>Id: {item.id}</p>
            <p>Description: {item.description}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => handleUpdateItem(item.id)}>Update Item</button>
            <button onClick={() => handleRemoveItem(item.id)}>Remove Item</button>
          </div>
        ))}
      </div>
      <Link to="/create-item">Add Item</Link> {/* Add this line for the "Add Item" button */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default UserPage;
