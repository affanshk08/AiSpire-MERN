import React, { createContext, useReducer, useEffect } from 'react';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload, isAuthenticated: true };
    case 'LOGOUT':
      return { user: null, isAuthenticated: false };
    default:
      return state;
  }
};

export const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      if (storedUser) {
        dispatch({ type: 'LOGIN', payload: storedUser });
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      // Handle potential localStorage parsing errors gracefully
      dispatch({ type: 'LOGOUT' });
    }
  }, []);

  // Update localStorage whenever the user state changes
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};