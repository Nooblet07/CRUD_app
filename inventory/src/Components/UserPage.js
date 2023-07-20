import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from 'flowbite-react';

export default function UserPage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [inventoryItems, setInventoryItems] = useState([]); // Use inventoryItems state instead of items
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Use Effect is working!')
    const token = Cookies.get('token');
    const userId = Cookies.get('id');

    if (!token || !userId) {
    //   setError('User not authenticated');
      return;
    }

    fetch(`http://localhost:3030/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch user data');
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch((err) => {
        setError(err.message);
      });

    fetch('http://localhost:3030/items', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to fetch inventory items');
        }
        return res.json();
      })
      .then((data) => {
        console.log(data)
        setInventoryItems(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  if (error) {
    return (
      <div className="h-screen flex flex-col">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div>
      <h1>User's Page</h1>
      <ul>
        {inventoryItems.map((item) => ( // Use inventoryItems instead of items
          <li key={item.id}>
            <p>{item.item_name}</p>
            <p>{item.description}</p>
            <p>Quantity: {item.quantity}</p>
          </li>
        ))}
      </ul>
      <Card>
        <div className="flex justify-between">
          <h1 className="text-6xl font-extrabold dark:text-white mb-5 flex items-center">
            Welcome {user && user[0].first_name} {user && user[0].last_name}
          </h1>
          <div className="flex items-center">
            <Button onClick={() => navigate(`/users/userAccount/${Cookies.get('id')}`)}>Home Page</Button>
            <Button onClick={() => { Cookies.remove('token'); Cookies.remove('id'); navigate('/', { replace: true }); }} className="ml-10">Sign Out</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
