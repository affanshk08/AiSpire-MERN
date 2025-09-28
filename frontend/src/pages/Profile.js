import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import MyAssessments from '../components/profile/MyAssessments';
import MyAppointments from '../components/profile/MyAppointments';
import { getUserAppointments } from '../services/appointmentService';
import './Profile.css';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [assessments, setAssessments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  // Set loading to true initially
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Ensure user exists before fetching data
    if (user && user.token) {
      const fetchProfileData = async () => {
        try {
          const userAppointments = await getUserAppointments();
          setAppointments(userAppointments);

          // Mock assessment data
          setAssessments([
            { _id: '1', title: 'Career Aptitude Test' },
            { _id: '2', title: 'Personality Assessment' }
          ]);
        } catch (error) {
          console.error('Failed to fetch profile data', error);
        } finally {
          setLoading(false);
        }
      };

      fetchProfileData();
    } else if (user === null) {
      // If user is explicitly null (not just undefined), stop loading
      setLoading(false);
    }
  }, [user]); // Re-run effect when user object changes

  if (loading) {
    return <div className="container"><p>Loading profile...</p></div>;
  }
  
  if (!user) {
    // You can redirect or show a message if the user is not logged in
    return <div className="container"><p>Please log in to view your profile.</p></div>
  }

  return (
    <div className="profile-page container">
      <div className="profile-header">
        <h1>Welcome, {user.name}</h1>
        <p>Here is a summary of your career journey with Aispire.</p>
      </div>

      <div className="profile-grid">
        <div className="profile-details card">
          <h3>Your Information</h3>
          <div className="detail-item">
            <span className="detail-label">Full Name</span>
            <span className="detail-value">{user.name}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Email Address</span>
            <span className="detail-value">{user.email}</span>
          </div>
        </div>

        <div className="dashboard-widgets">
          <MyAppointments appointments={appointments} />
          <MyAssessments assessments={assessments} />
        </div>
      </div>
    </div>
  );
};

export default Profile;