import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const UpdateItem = () => {
  const { itemId } = useParams();
  const [itemName, setItemName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchItemDetails();
  }, []);

  const fetchItemDetails = async () => {
    try {
      const token = Cookies.get('token');
      const response = await fetch(`http://localhost:3030/items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch item details');
      }

      const itemData = await response.json();
      setItemName(itemData.item_name);
      setDescription(itemData.description);
      setQuantity(itemData.quantity);
    } catch (error) {
      console.error('An error occurred while fetching item details:', error);
    }
  };

  const handleUpdateItem = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get('token');
      const response = await fetch(`http://localhost:3030/items/${itemId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          item_name: itemName,
          description,
          quantity,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update item');
      }

      // After successful update, navigate back to the user page to see the updated list of items
      navigate('/users/:id');
    } catch (error) {
      console.error('An error occurred while updating the item:', error);
    }
  };

  return (
    <div>
      <h1>Update Item</h1>
      <form onSubmit={handleUpdateItem}>
        <label htmlFor="item_name">Item Name:</label>
        <input
          type="text"
          id="item_name"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          required
        />
        <label htmlFor="description">Description:</label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
        />
        <button type="submit">Update Item</button>
      </form>
    </div>
  );
};

export default UpdateItem;
