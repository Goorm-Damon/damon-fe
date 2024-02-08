import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// 기본적인 로딩 스피너 CSS
const spinnerStyle = {
  width: '40px',
  height: '40px',
  border: '4px solid rgba(0, 0, 0, .1)',
  borderTopColor: '#767676',
  borderRadius: '50%',
  animation: 'spin 1s linear infinite'
};

// @keyframes CSS 규칙 추가
const globalStyle = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const ProtectedRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <style>{globalStyle}</style>
        <div style={spinnerStyle}></div>
      </div>
    );
  }

  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;