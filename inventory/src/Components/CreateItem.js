import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const CreateItem = () => {
    const [itemData, setItemData] = useState({
      id: '',
      user_id: '',
      item_name: '',
      description: '',
      quantity: '',
    });
  
    const navigate = useNavigate();
  
    const handleCreateItem = async (e) => {
      e.preventDefault();
  
      try {
        const token = Cookies.get('token');
        const response = await fetch('http://localhost:3030/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(itemData),
        });
  
        if (!response.ok) {
          throw new Error('Failed to create item');
        }
  
        // Redirect to the user page after successful creation
        navigate('/users/:id');
      } catch (error) {
        console.error('An error occurred while creating the item:', error);
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setItemData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

  return (
    <div>
      <h1>Create Item</h1>
      <form onSubmit={handleCreateItem}>
        <label htmlFor="id">ID:</label>
        <input
          type="text"
          id="id"
          name="id"
          value={itemData.id}
          onChange={handleChange}
          required
        />
        <label htmlFor="user_id">User ID:</label>
        <input
          type="text"
          id="user_id"
          name="user_id"
          value={itemData.user_id}
          onChange={handleChange}
          required
        />
        <label htmlFor="item_name">Item Name:</label>
        <input
          type="text"
          id="item_name"
          name="item_name"
          value={itemData.item_name}
          onChange={handleChange}
          required
        />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          name="description"
          value={itemData.description}
          onChange={handleChange}
          required
        />
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={itemData.quantity}
          onChange={handleChange}
          required
        />
        <button type="submit">Create Item</button>
      </form>
    </div>
  );
};

export default CreateItem;
