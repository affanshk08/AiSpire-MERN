import React, { useState, useEffect } from 'react';
import './Colleges.css';

const Colleges = () => {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchColleges = async () => {
      try {
        const res = await fetch('/api/colleges');
        const data = await res.json();
        setColleges(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching colleges:', error);
        setLoading(false);
      }
    };

    fetchColleges();
  }, []);

  if (loading) {
    return <div className="container">Loading colleges...</div>;
  }

  return (
    <div className="colleges-container container">
      <h1>Colleges in Surat for BCA & Related Degrees</h1>
      <div className="college-list">
        {colleges.map((college) => (
          <div key={college._id} className="college-card">
            <h3>{college.name}</h3>
            <p><strong>Location:</strong> {college.location}</p>
            <p><strong>Speciality:</strong> {college.speciality}</p>
            <p><strong>Established:</strong> {college.establishmentYear}</p>
            <p><strong>Affiliated to VNSGU:</strong> {college.affiliatedToVNSGU ? 'Yes' : 'No'}</p>
            <div className="courses-list">
              <strong>Courses Offered:</strong>
              <ul>
                {college.courses.map((course, index) => (
                  <li key={index}>{course}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Colleges;