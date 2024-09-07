import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cards from './pages/Cards';

// <Route path="/" element={<Page />} />
function App() {
    return (
        <Router>
            <Routes>
                {/* Base routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* Public routes */}
                <Route path="/cards" element={<Cards />} />
            </Routes>
        </Router>
    );
}

export default App;