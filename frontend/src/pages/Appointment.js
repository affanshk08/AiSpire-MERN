import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { bookAppointment } from '../services/appointmentService';
import './Appointment.css';

const Appointment = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [counselor, setCounselor] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const counselors = ['Dr. Emily Carter', 'Dr. Johnathan Reed', 'Dr. Sarah Chen'];

  const validateAppointment = () => {
    // Date validation: Must be at least one day in the future
    const today = new Date();
    const selectedDate = new Date(date);
    today.setHours(0, 0, 0, 0); 
    if (selectedDate <= today) {
      setError('Appointment date must be at least one day in the future.');
      return false;
    }

    // Time validation: Must be between 10 AM and 4 PM, excluding lunch break
    if (time) {
      const [hour, minute] = time.split(':').map(Number);
      if (hour < 10 || hour >= 16) {
        setError('Appointments are only available between 10:00 AM and 4:00 PM.');
        return false;
      }
      if (hour === 13 && minute >= 0 && minute < 30) {
        setError('Counselors are on a lunch break from 1:00 PM to 1:30 PM.');
        return false;
      }
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!validateAppointment()) {
      return;
    }
    
    // Simulate payment processing
    console.log('Processing payment...');

    try {
      const appointmentDetails = {
        date,
        time,
        counselor,
        user: user._id
      };

      await bookAppointment(appointmentDetails);
      
      setSuccess('Payment successful! Your appointment has been booked.');
      setTimeout(() => navigate('/profile'), 2000);

    } catch (err) {
      setError(err.message || 'Failed to book appointment. Please try again.');
    }
  };

  return (
    <div className="appointment-page container">
      <div className="page-header">
        <h1>Book an Appointment</h1>
        <p>Schedule your session with a career counselor.</p>
      </div>

      <form onSubmit={handleSubmit} className="appointment-form">
        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message">{success}</div>}

        <div className="form-group">
          <label htmlFor="date">Select a Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Select a Time</label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="counselor">Select a Counselor</label>
          <select id="counselor" value={counselor} onChange={(e) => setCounselor(e.target.value)} required>
            <option value="" disabled>--Please choose a counselor--</option>
            {counselors.map((c, index) => (
              <option key={index} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="submit-btn">Proceed to Payment & Book</button>
      </form>
    </div>
  );
};

export default Appointment;