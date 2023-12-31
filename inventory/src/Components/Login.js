import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Card, Button } from 'flowbite-react';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState('')
  const [selectedItem, setSelectedItem] = useState(null);

  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    // Fetch items from the database when the component mounts
    fetchItems();
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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3030/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUserId(data.id);
        // Redirect to the user page after successful login
        navigate(`/users/:id`);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  const handleCreateAccount = () => {
    navigate('/create-account');
  };

  //Limits the text length of the item's description
function truncateText(text, maxLength) {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
}

const handleViewItem = (item) => {
  setSelectedItem(item);
};

  return (
    <div className="login-container">
      <h2>{'Welcome Visitor'}</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <h2>Login</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <p>Don't have an account?{' '}
        <Link to="/create-account">Create Account</Link>
      </p>
      </form>
      <div className="items-and-selected-container">
          <div className="items-container">
            {items.map((item) => (
              <div key={item.id}>
                <h3>Item Name: {item.item_name}</h3>
                <p>Id: {item.id}</p>
                <p>Description: {truncateText(item.description, 100)}</p>
                <p>Quantity: {item.quantity}</p>
                <Button onClick={() => handleViewItem(item)}>View Item</Button>
              </div>
            ))}
          </div>
          <div className="selected-item-card">
            {selectedItem && (
              <Card>
                <h3>Selected Item:</h3>
                <p>Item Name: {selectedItem.item_name}</p>
                <p>Id: {selectedItem.id}</p>
                <p>Description: {selectedItem.description}</p>
                <p>Quantity: {selectedItem.quantity}</p>
              </Card>
            )}
          </div>
        </div>
      </div>
  );
};

export default LoginPage;
