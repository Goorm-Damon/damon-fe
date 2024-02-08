import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './LoginButton.scss';
import kakaoLogo from '../../assets/Kakao_Logo.png';

function KakaoLoginButton() {
  const REST_API_KEY = 'ab3a8af0dfdacf22fc47199199e5bb2f';
  const REDIRECT_URI = 'http://localhost:8080/login/oauth2/code/kakao';
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const location = useLocation();
  const navigate = useNavigate();

  // 인증 코드를 사용하여 액세스 토큰을 요청하는 함수
  const getToken = async (code) => {
    const body = `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`;
    try {
      const response = await fetch('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body,
      });
      const data = await response.json();
      localStorage.setItem('kakao_token', data.access_token);
      navigate('/'); // 로그인 성공 후 리디렉션
    } catch (err) {
      console.error(err);
    }
  };

  // URL에서 인증 코드 추출 및 처리
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');
    if (code) {
      getToken(code);
    }
  }, [location]);

  return (
    <button className="social-login-button kakao-login-button" onClick={() => window.location.href = link}>
      <img src={kakaoLogo} alt="Kakao logo" className="button-logo" />
      카카오로 시작하기
    </button>
  );
}

export default KakaoLoginButton;