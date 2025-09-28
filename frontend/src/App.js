import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Careers from './pages/Careers';
import CareerDetails from './pages/CareerDetails';
import Assessments from './pages/Assessments';
import Contact from './pages/Contact';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Profile from './pages/Profile';
import Appointment from './pages/Appointment';
import ProtectedRoute from './components/auth/ProtectedRoute';
import AdminRoute from './components/auth/AdminRoute';
import AdminDashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            {/* === PUBLIC ROUTES === */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />

            {/* === PROTECTED ROUTES FOR LOGGED-IN USERS === */}
            <Route element={<ProtectedRoute />}>
              <Route path="/careers" element={<Careers />} />
              <Route path="/careers/:id" element={<CareerDetails />} />
              <Route path="/assessments" element={<Assessments />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/appointment" element={<Appointment />} />
            </Route>

            {/* === PROTECTED ROUTES FOR ADMINS ONLY === */}
            <Route element={<AdminRoute />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;