import React from 'react';
import { useRecoilValue } from 'recoil';
import { userState } from '../states/userState';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = useRecoilValue(userState);

  if (!user) {
    // 사용자가 로그인하지 않았다면 로그인 페이지로 리다이렉트
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;