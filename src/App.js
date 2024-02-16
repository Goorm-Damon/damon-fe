import React, { useState } from 'react';
import KakaoLoginComponent from './components/KakaoLoginComponent';
import UserInfoComponent from './components/UserInfoComponent';

const App = () => {
  // 서버로부터 받은 토큰 상태 관리
  const [serverToken, setServerToken] = useState('');

  // 카카오 로그인 후 받은 토큰을 설정하는 함수
  const handleSetToken = (token) => {
    setServerToken(token);
  };

  return (
    <div>
      <h1>Kakao Login</h1>
      <KakaoLoginComponent onSetToken={handleSetToken} />
      <hr />
      <h1>User Information</h1>
      <UserInfoComponent serverToken={serverToken} />
    </div>
  );
};

export default App;