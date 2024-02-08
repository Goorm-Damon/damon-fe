import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Loginpage.scss';
import { useNavigate } from 'react-router-dom';
import NaverLoginButton from '../../components/login/NaverLoginButton';
import KakaoLoginButton from '../../components/login/KakaoLoginButton';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

function Login() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {

    const code = new URL(window.location.href).searchParams.get('code');
    if (code) {
      axios.post('/api/auth/social-login', { code })
        .then(response => {
          // 로그인 처리 성공
          navigate('/main'); // 메인 페이지로 리다이렉트
        })
        .catch(error => {
          // 로그인 처리 실패
          console.error('로그인 처리 중 오류 발생', error);
          // 에러 처리 로직 추가 가능
        });
    }

    // 기존의 API 호출 코드
    axios.get('/api/time')
      .then(response => {
        setCurrentTime(response.data);
      })
      .catch(error => {
        console.error('API 호출 중 오류 발생:', error);
      });

    return () => {
      // 컴포넌트 언마운트 시 인터셉터 제거
      // axios.interceptors.response.eject(responseInterceptor);
    };
  }, [navigate]);

  return (
    <div className="login-page">
      <header className="header">
        <h1>DAMON</h1>
        <p>지금 사용하는 아이디로<br /> 다른 서비스에 가입하실 수 있습니다.</p>
      </header>
      <div className="Social-login">
        <KakaoLoginButton />
        <NaverLoginButton />
      </div>
    </div>
  );
}

export default Login;

