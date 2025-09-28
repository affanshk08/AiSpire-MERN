import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Use 'undefined' to represent the initial loading state
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    // On app start, check for user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // If no user, set to null (meaning not logged in)
      setUser(null);
    }
  }, []);

  const login = (userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // The value now includes the logout function and the reliable user state
  const value = { user, login, logout };

  // Render children only after the user state has been determined
  // This prevents pages from loading before we know if the user is logged in
  return (
    <AuthContext.Provider value={value}>
      {user !== undefined ? children : <div>Loading Application...</div>}
    </AuthContext.Provider>
  );
};