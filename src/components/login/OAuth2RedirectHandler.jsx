import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function OAuth2RedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 토큰을 추출합니다.
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    // 추출한 토큰을 로컬 스토리지에 저장합니다.
    if (token) {
      localStorage.setItem('token', token);
    }

    // 메인 페이지로 리다이렉트합니다.
    navigate('/main');
  }, [navigate]);

  return <div>로그인 처리 중...</div>;
}

export default OAuth2RedirectHandler;

