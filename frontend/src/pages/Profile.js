import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <div className="container"><p>Loading profile...</p></div>;
  }

  return (
    <div className="profile-page container">
      <div className="page-header">
        <h1>Your Profile</h1>
        <p>This is your personal information on file.</p>
      </div>
      <div className="profile-details">
        <div className="detail-item">
          <span className="detail-label">Full Name</span>
          <span className="detail-value">{user.name}</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Email Address</span>
          <span className="detail-value">{user.email}</span>
        </div>
      </div>
    </div>
  );
};

export default Profile;