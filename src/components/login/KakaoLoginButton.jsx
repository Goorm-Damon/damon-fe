import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginButton.scss';
import kakaoLogo from '../../assets/Kakao_Logo.png';

function KakaoLoginButton() {
  ;

  // 버튼 클릭 시 카카오 로그인 페이지로 리다이렉트
  const handleLogin = () => {
    const REST_API_KEY = 'ab3a8af0dfdacf22fc47199199e5bb2f';
    const REDIRECT_URI = 'http://localhost:8080/login/oauth2/code/kakao'; // 클라이언트에서 사용하는 리다이렉트 URI
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    window.location.href = link;
  };

  return (
    <button className="social-login-button kakao-login-button" onClick={handleLogin}>
      <img src={kakaoLogo} alt="Kakao logo" className="button-logo" />
      카카오로 시작하기
    </button>
  );
}

export default KakaoLoginButton;
