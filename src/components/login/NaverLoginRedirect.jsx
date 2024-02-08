import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthActions } from '../../hooks/useAuthActions'; // useAuthActions 훅 가져오기

function NaverLoginRedirectHandler() {
  const navigate = useNavigate();
  const { login } = useAuthActions(); // Recoil을 사용하는 새로운 login 함수 가져오기

  useEffect(() => {
    const fetchAuthResult = async () => {
      const token = new URLSearchParams(window.location.search).get('token');
      console.log('Extracted token:', token); // 토큰 추출 로그
      if (token) {
        try {
          await login(token); // login 함수 호출
          console.log('Login success and navigating to /main');
          navigate('/main');
        } catch (error) {
          console.error('로그인 처리 중 에러 발생', error);
          navigate('/');
        }
      } else {
        navigate('/'); // 토큰 없음 에러 시 리다이렉트할 경로
      }
    };
  
    fetchAuthResult();
  }, [navigate, login]); // navigate 및 login 함수를 의존성 배열에 추가

  return <div>네이버 로그인 처리 중...</div>;
}

export default NaverLoginRedirectHandler;
