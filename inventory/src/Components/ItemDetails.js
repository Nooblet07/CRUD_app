import React from 'react';

//Limits the text length of the item's description
function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

const ItemDetails = ({ item }) => {
  return (
    <div>
      <h3>Item Name: {item.item_name}</h3>
      <p>Id: {item.id}</p>
      <p>Description: {truncateText(item.description, 100)}</p>
      <p>Quantity: {item.quantity}</p>
    </div>
  );
};

export default ItemDetails;
