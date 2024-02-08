import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function NaverLoginRedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthResult = async () => {
      try {
        // URL에서 인가 코드와 상태 토큰 추출
       // URL에서 JWT 토큰 추출 (가정)
      const token = new URLSearchParams(window.location.search).get('token');

      if (token) {
        // 성공 처리 로직: 토큰을 로컬 스토리지에 저장하고 메인 페이지로 이동
        localStorage.setItem('token', token);
        navigate('/main'); // 인증 성공 후 리다이렉트할 경로
      } else {
        // 토큰이 없다면 에러 처리
        throw new Error('Token not found');
      }
      } catch (error) {
        // 에러 처리 로직
        console.error('로그인 처리 중 에러 발생', error);
        navigate('/'); // 에러 발생 시 리다이렉트할 경로
      }
    };

    fetchAuthResult();
  }, [navigate]);

  return <div>네이버 로그인 처리 중...</div>;
}

export default NaverLoginRedirectHandler;