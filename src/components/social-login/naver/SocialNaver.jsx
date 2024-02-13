import React from 'react'
import styles from './SocialNaver.module.scss'
import naverLogo from '../../../assets/naver_logo.png'

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
    <div className={styles.container}>
      <button className={styles.naver__btn} onClick={handleLogin}>
      <img src={naverLogo} alt="naver_logo" className={styles.naver__logo} />
        <p>네이버로 시작하기</p>
      </button>
    </div>
  )
}

export default SocialNaver