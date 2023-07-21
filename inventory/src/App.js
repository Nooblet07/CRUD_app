import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/Login';
import CreateItem from './Components/CreateItem';
import UpdateItem from './Components/UpdateItem'
import UserPage from './Components/UserPage';
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
