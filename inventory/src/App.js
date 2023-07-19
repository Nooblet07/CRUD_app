import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" component={Login} />
        {/* Add other routes for inventory and item pages */}
      </Routes>
    </Router>
  );
};

export default App;
