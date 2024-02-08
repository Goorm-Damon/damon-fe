import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function KakaoRedirectHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAuthResult = async () => {
      try {
        const code = new URLSearchParams(window.location.search).get('code');
        // 백엔드 서버에 인가 코드를 전달하고 JWT 토큰을 요청하는 로직으로 수정
        const response = await axios.post('/api/auth/kakao/callback', {
          code,
        });

        // 성공 처리 로직
        localStorage.setItem('token', response.data.token);
        navigate('/main'); // 인증 성공 후 리다이렉트할 경로
      } catch (error) {
        // 에러 처리 로직
        console.error('로그인 처리 중 에러 발생', error);
        navigate('/'); // 에러 발생 시 리다이렉트할 경로
      }
    };

    fetchAuthResult();
  }, [navigate]);

  return <div>카카오 로그인 처리 중...</div>;
}

export default KakaoRedirectHandler;

