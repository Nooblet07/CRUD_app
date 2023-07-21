import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet, useNavigate } from 'react-router-dom';
import LoginPage from './Components/Login';
import CreateItem from './Components/CreateItem';
import UpdateItem from './Components/UpdateItem'
import UserPage from './Components/UserPage';
import Cookies from 'js-cookie';
import './index.css';
import CreateAccount from './Components/CreateAccount';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/users/:id" element={<UserPage />} />
        <Route path="/create-item" element={<CreateItem />} /> 
        <Route path="/update-item/:itemId" element={<UpdateItem />} /> 
        <Route path="/create-account" element={<CreateAccount />} />
      </Routes>
    </Router>
  );
}

// // A helper component for protected routes
// function PrivateRoute({ element }) {
//   const isAuthenticated = !!Cookies.get('token'); // Check if the user is authenticated
//   const navigate = useNavigate();

//   if (!isAuthenticated) {
//     // Redirect to the login page if the user is not authenticated
//     navigate('/login');
//     return null;
//   }

// //   return <Outlet />;
// }
