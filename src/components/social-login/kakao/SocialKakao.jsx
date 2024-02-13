import React from 'react'
import KakaoLogin from "react-kakao-login";

const SocialKakao = () => {

  const Rest_api_key = 'ab3a8af0dfdacf22fc47199199e5bb2f';
  const redirect_uri = 'http://localhost:8080/login/oauth2/code/kakao';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  }

  return (
    <div>
      <button onClick={handleLogin}>카카오 로그인</button>
    </div>
  )
}

export default SocialKakao