import React from 'react';
import './LoginButton.scss'; // 위에서 작성한 CSS 파일 import
import naverLogo from '../../assets/naver_logo.png';

function NaverLoginButton() {
  const CLIENT_ID = 'spdOdDxRE5b1jvsH5qAi'; // 네이버에서 제공받은 클라이언트 ID
  const REDIRECT_URI = 'http://localhost:8080/login/oauth2/code/naver'; // 네이버에서 설정한 리디렉션 URI
  const STATE = 'RANDOM_STATE'; // 보안을 위한 랜덤 문자열, 각 요청마다 유니크해야 합니다.
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