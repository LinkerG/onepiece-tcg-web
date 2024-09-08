import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cards from './pages/Cards';
import Collections from './pages/Collections';
import CollectionCards from './pages/CollectionCards';
import PruebasCardTrader from './pages/PruebasCardTrader';

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
                <Route path="/collections" element={<Collections />} />
                <Route path="/collections/:collectionName" element={<CollectionCards />} />
                {/* Test routes */}
                <Route path="/tests" element={<PruebasCardTrader />} />
            </Routes>
        </Router>
    );
}

export default App;