import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Appointments.css';

const Appointments = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [counselor, setCounselor] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const { token } = useContext(AuthContext);

  const handlePayment = async () => {
    setMessage('Processing payment...');
    try {
      const res = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setPaymentSuccess(true);
        setMessage('Payment successful! Please book your appointment.');
      } else {
        setMessage('Payment failed. Please try again.');
      }
    } catch (error) {
      setMessage('An error occurred during payment.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!paymentSuccess) {
      setMessage('Please complete the payment first.');
      return;
    }
    setMessage('Booking appointment...');
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ date, time, counselor }),
      });
      if (res.ok) {
        setMessage('Appointment booked successfully!');
        setDate('');
        setTime('');
        setCounselor('');
        setPaymentSuccess(false);
      } else {
        const data = await res.json();
        setMessage(data.message || 'Failed to book appointment.');
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="appointments-container container">
      <h2>Book an Appointment</h2>
      {message && <p className="message">{message}</p>}
      <div className="appointment-form-container">
        {!paymentSuccess ? (
          <div className="payment-section">
            <h3>Step 1: Payment</h3>
            <p>A fee of ₹200 is required to book an appointment.</p>
            <button onClick={handlePayment} className="btn pay-btn">
              Pay ₹200
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="appointment-form">
             <h3>Step 2: Select Details</h3>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="time">Time</label>
              <input type="time" id="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            </div>
            <div className="form-group">
              <label htmlFor="counselor">Counselor</label>
              <select id="counselor" value={counselor} onChange={(e) => setCounselor(e.target.value)} required >
                <option value="">Select a Counselor</option>
                <option value="Dr. Smith">Dr. Smith</option>
                <option value="Dr. Jones">Dr. Jones</option>
              </select>
            </div>
            <button type="submit" className="btn book-btn">
              Book Appointment
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Appointments;