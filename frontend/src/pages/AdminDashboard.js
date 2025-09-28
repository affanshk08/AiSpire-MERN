import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [careers, setCareers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !user.token) {
        setError('You are not authorized to view this page.');
        setLoading(false);
        return;
      }

      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      try {
        const [usersRes, careersRes, appointmentsRes] = await Promise.all([
          axios.get('/api/users', config),
          axios.get('/api/careers', config),
          axios.get('/api/appointments/all', config)
        ]);

        setUsers(usersRes.data);
        setCareers(careersRes.data);
        setAppointments(appointmentsRes.data);
      } catch (err) {
        setError('Failed to fetch admin data. Please try again later.');
        console.error('Failed to fetch admin data', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return <div className="container"><h2>Loading Admin Data...</h2></div>;
  }

  if (error) {
    return <div className="container"><h2>{error}</h2></div>;
  }

  return (
    <div className="admin-dashboard container">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
      </div>

      <div className="admin-section">
        <h2>User Management ({users.length})</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.isAdmin ? 'Yes' : 'No'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-section">
        <h2>Career Management ({careers.length})</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Avg. Salary</th>
                <th>Education</th>
              </tr>
            </thead>
            <tbody>
              {careers.map((c) => (
                <tr key={c._id}>
                  <td>{c.title}</td>
                  <td>${(c.averageSalary || 0).toLocaleString()}</td>
                  <td>{c.educationRequired}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="admin-section">
        <h2>All Appointments ({appointments.length})</h2>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>User</th>
                <th>Counselor</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((a) => (
                <tr key={a._id}>
                  <td>{new Date(a.date).toLocaleString()}</td>
                  <td>{a.user ? `${a.user.name} (${a.user.email})` : 'N/A'}</td>
                  <td>{a.counselor}</td>
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