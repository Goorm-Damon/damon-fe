import React from 'react';
import './LoginButton.scss';
import naverLogo from '../../assets/naver_logo.png';

function NaverLoginButton() {

  const CLIENT_ID = 'spdOdDxRE5b1jvsH5qAi';
  const REDIRECT_URI = encodeURIComponent('http://localhost:8080/oauth2/authorization/naver');

  // 랜덤 state 값 생성
  const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const STATE = encodeURIComponent(generateRandomString());

  const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`;

  const handleLogin = () => {
    window.location.href = naverAuthUrl;
  };

  return (
    <button className="social-login-button naver-login-button" onClick={handleLogin}>
      <img src={naverLogo} alt="Naver logo" className="button-logo" />
      네이버로 시작하기
    </button>
  );
}

export default NaverLoginButton;
