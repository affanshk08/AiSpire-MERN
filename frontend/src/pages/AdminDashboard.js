import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);
  const { user, token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.role === 'admin') {
        try {
          const appointmentRes = await fetch('/api/admin/appointments', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const appointmentsData = await appointmentRes.json();
          setAppointments(appointmentsData);

          const contactRes = await fetch('/api/admin/contacts', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const contactsData = await contactRes.json();
          setContacts(contactsData);
        } catch (error) {
          console.error('Failed to fetch admin data', error);
        }
      }
    };

    fetchData();
  }, [user, token]);

  return (
    <div className="admin-dashboard container">
      <h1>Admin Dashboard</h1>

      <div className="section">
        <h2>Appointments</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Counselor</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((apt) => (
                <tr key={apt._id}>
                  <td>{apt.user ? apt.user.name : 'N/A'}</td>
                  <td>{apt.user ? apt.user.email : 'N/A'}</td>
                  <td>{apt.counselor}</td>
                  <td>{new Date(apt.date).toLocaleDateString()}</td>
                  <td>{apt.time}</td>
                  <td>{apt.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section">
        <h2>Contact Messages</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Received</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact._id}>
                  <td>{contact.name}</td>
                  <td>{contact.email}</td>
                  <td>{contact.message}</td>
                  <td>{new Date(contact.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;