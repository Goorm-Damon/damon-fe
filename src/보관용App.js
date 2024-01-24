import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/App.css';
import NaverLoginButton from './Components/LoginComponent/NaverLoginButton';
import KakaoLoginButton from './Components/LoginComponent/KakaoLoginButton';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

// Header 컴포넌트
function Header() {
  return (
    <header className="App-header">
      <h1>DAMON</h1>
      <p>지금 사용하는 아이디로<br /> 다른 서비스에 가입하실 수 있습니다.</p>
    </header>
  );
}

// SocialLoginButtons 컴포넌트
function SocialLoginButtons() {
  return (
    <div className="Social-login">
      <KakaoLoginButton />
      <NaverLoginButton />
    </div>
  );
}

function App() {
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    console.log(process.env.REACT_APP_API_MODE);
    // /api/time 엔드포인트로 GET 요청을 보냄
    axios.get('/api/time')
      .then(response => {
        setCurrentTime(response.data);
      })
      .catch(error => {
        console.error('API 호출 중 오류 발생:', error);
      });
  }, []); // 빈 배열을 전달하여 컴포넌트가 처음 마운트될 때만 실행

  return (
    <div className="App">
      <Header />
      <div className="Current-time">
        <p>{currentTime}</p>
      </div>
      <SocialLoginButtons />
    </div>
  );
}

export default App;
