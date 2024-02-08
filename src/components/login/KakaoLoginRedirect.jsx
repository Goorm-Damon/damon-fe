import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthActions } from '../../hooks/useAuthActions'; // useAuthActions 훅을 임포트

function KakaoRedirectHandler() {
  const navigate = useNavigate();
  const { login } = useAuthActions(); // useAuthActions 훅에서 login 함수를 가져옴

  useEffect(() => {
    const fetchAuthResult = async () => {
      try {
        const code = new URLSearchParams(window.location.search).get('code');
        // 백엔드 서버에 인가 코드를 전달하고 JWT 토큰을 요청
        const response = await axios.post('/api/auth/kakao/callback', {
          code,
        });

        // 성공 처리 로직: useAuthActions 훅의 login 함수를 사용하여 로그인 상태 관리
        login(response.data.token); // JWT 토큰을 Recoil 상태로 관리
        navigate('/main'); // 인증 성공 후 리다이렉트할 경로
      } catch (error) {
        // 에러 처리 로직
        console.error('로그인 처리 중 에러 발생', error);
        navigate('/'); // 에러 발생 시 리다이렉트할 경로
      }
    };

    fetchAuthResult();
  }, [navigate, login]); // 의존성 배열에 login 추가

  return <div>카카오 로그인 처리 중...</div>;
}

export default KakaoRedirectHandler;

