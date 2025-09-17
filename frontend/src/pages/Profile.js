import React from 'react';

const Profile = () => {
  // This will be dynamic in the future
  const userData = {
    name: 'User',
    email: 'user@example.com',
    memberSince: new Date().toLocaleDateString(),
    assessmentsTaken: 3,
    careersSaved: 5,
  };

  return (
    <div className="page-container">
      <h2>User Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Member Since:</strong> {userData.memberSince}</p>
        <hr />
        <h4>Activity</h4>
        <p><strong>Assessments Taken:</strong> {userData.assessmentsTaken}</p>
        <p><strong>Saved Careers:</strong> {userData.careersSaved}</p>
      </div>
    </div>
  );
};

export default Profile;