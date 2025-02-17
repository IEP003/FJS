import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HotelSearchScreen from './screens/HotelSearchScreen';
import BookingScreen from './screens/BookingScreen';
import Header from './components/Header';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/hotels" element={<HotelSearchScreen />} />
        <Route path="/bookings" element={<BookingScreen />} />
      </Routes>
    </Router>
  );
};

export default App;
