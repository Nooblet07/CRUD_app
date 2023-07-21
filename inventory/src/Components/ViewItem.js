import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button } from 'flowbite-react';

const ViewItem = () => {
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    // Fetch the item details when the component mounts
    fetchItemDetails();
  }, []);

  const fetchItemDetails = async () => {
    try {
      const response = await fetch(`http://localhost:3030/items/${itemId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch item details');
      }
      const itemData = await response.json();
      setItem(itemData);
    } catch (error) {
      console.error('An error occurred while fetching item details:', error);
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Card>
        <h3>Item Name: {item.item_name}</h3>
        <p>Id: {item.id}</p>
        <p>Description: {item.description}</p>
        <p>Quantity: {item.quantity}</p>
        {/* Add more details here if needed */}
        <Link to={`/users/${item.user_id}`}>Back to UserPage</Link>
      </Card>
    </div>
  );
};

export default ViewItem;
