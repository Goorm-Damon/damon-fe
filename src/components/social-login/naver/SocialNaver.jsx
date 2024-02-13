import React from 'react'
import KakaoLogin from "react-kakao-login";

const SocialNaver = () => {

  const CLIENT_ID = 'spdOdDxRE5b1jvsH5qAi';
  const REDIRECT_URI = 'http://localhost:8080/oauth2/authorization/naver';
  // 랜덤 state 값 생성
  const generateRandomString = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const STATE = encodeURIComponent(generateRandomString());
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=${STATE}`;

  const handleLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  }

  return (
    <div>
      <button onClick={handleLogin}>네이버 로그인</button>
    </div>
  )
}

export default SocialNaver