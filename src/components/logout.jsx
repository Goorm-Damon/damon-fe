import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 경로는 실제 프로젝트 구조에 맞게 조정

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); // AuthContext에서 logout 함수 사용

  const handleLogout = () => {
    logout(); // 로그아웃 함수 호출
    navigate('/'); // 로그인 페이지로 리다이렉트
  };

  return (
    <button onClick={handleLogout}>로그아웃</button>
  );
};

export default LogoutButton;