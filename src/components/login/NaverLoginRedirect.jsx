import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NaverLoginRedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');
    const state = new URLSearchParams(window.location.search).get('state');

    if (code && state) {
      // 백엔드에 인증 코드 전송 및 JWT 토큰 요청
      axios.post('/api/auth/naver', { code, state })
        .then(response => {
          const { token } = response.data;
          localStorage.setItem('token', token); // JWT 토큰 저장
          navigate('/main'); // 메인 페이지로 리다이렉트
        })
        .catch(error => {
          console.error('네이버 로그인 처리 중 에러 발생', error);
          navigate('/'); // 에러 발생 시 리다이렉트할 경로
        });
    }
  }, [navigate]);

  return <div>네이버 로그인 처리 중...</div>;
}

export default NaverLoginRedirectHandler;