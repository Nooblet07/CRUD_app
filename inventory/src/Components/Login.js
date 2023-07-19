import { Card, Button } from 'flowbite-react';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import Cookies from 'js-cookie'



export default function UserLogin() {
  const Navigate = useNavigate();
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');

  const signIn = async () => {
    try {
      const response = await fetch('http://localhost:3030/login/validation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      if (response.ok) {
        const data = await response.json()

        Cookies.set('token', data.token);
        Cookies.set('id', data.id);
        Navigate(`/users/${data.id}`);
      } else {
        setToken(true);
        setUsername('');
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="max-w-lg flex flex-col items-center">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Welcome to the DOD Evaluation System!
        </h2>
        {token && <p>User Authentication Failed</p>}
        <input placeholder="Email" value={username} type="email" onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="Password" value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
        <Button onClick={() => signIn()}>Login</Button>
        <div className="flex">
          <p className="mr-2">Don't have an account?</p>
          <Link to="/login/createAccount" className="text-blue-800">
            Create Account
          </Link>
        </div>
      </Card>
    </div>
  );
}
