import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KakaoLoginComponent = ({ onSetToken }) => {
  const [authCode, setAuthCode] = useState('');

  const handleLogin = async () => {
    try {
      // 카카오 인가 요청
      window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // URL에서 받은 코드를 사용하여 서버로 로그인 요청을 보냄
  const handleCodeExchange = async (code) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/kakao/login?code=${code}`);
      const serverToken = response.data;
      // 서버에서 받은 토큰을 부모 컴포넌트로 전달하여 상태를 업데이트합니다.
      onSetToken(serverToken);

      // URL을 변경하여 쿼리 매개변수를 제거합니다.
      window.history.replaceState({}, document.title, window.location.href.split('?')[0]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      handleCodeExchange(code);
    }
  }, []);

  return (
    <div>
      <button onClick={handleLogin}>Kakao Login</button>
    </div>
  );
};

export default KakaoLoginComponent;