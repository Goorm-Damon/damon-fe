import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginButton.scss';
import kakaoLogo from '../../assets/Kakao_Logo.png';

function KakaoLoginButton() {
  const navigate = useNavigate(); // 네비게이션 함수 사용
  const REST_API_KEY = 'ab3a8af0dfdacf22fc47199199e5bb2f';
  const REDIRECT_URI = 'http://localhost:8080/login/oauth2/code/kakao'; // 리다이렉트 URI를 올바르게 설정하세요.
  const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = link;
  };

  const getToken = async () => {
    const code = new URL(window.location.href).searchParams.get('code');
    if (!code) return;

    try {
      const response = await fetch('https://kauth.kakao.com/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
        body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
      });

      const data = await response.json();
      localStorage.setItem('kakao_token', data.access_token);
      sendTokenToBackend(data.access_token);
    } catch (err) {
      console.error(err);
    }
  };

  const sendTokenToBackend = async (accessToken) => {
    try {
      const response = await fetch('http://localhost:8080/login/oauth2/code/kakao', {
        method: 'POST', // POST 메소드로 변경
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Bearer 스키마 추가
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      localStorage.setItem('access_token', data.access_token);
      navigate('/'); // 로그인 성공 후 메인 페이지로 이동
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <button className="social-login-button kakao-login-button" onClick={handleLogin}>
      <img src={kakaoLogo} alt="Kakao logo" className="button-logo" />
      카카오로 시작하기
    </button>
  );
}

export default KakaoLoginButton;
