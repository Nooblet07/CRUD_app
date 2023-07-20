import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import LoginPage from './Components/Login';
import Login from './Components/Login'
import UserPage from './Components/UserPage';
import Cookies from 'js-cookie';
import './index.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserPage />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

// A helper component for protected routes
function PrivateRoute({ element }) {
  const isAuthenticated = !!Cookies.get('token'); // Check if the user is authenticated
  const navigate = useNavigate();

  if (!isAuthenticated) {
    // Redirect to the login page if the user is not authenticated
    navigate('/login');
    return null;
  }

  return <Outlet />;
}

// export default App;
