import React from 'react'
import styles from './SocialKakao.module.scss'
import kakaoLogo from '../../../assets/Kakao_Logo.png';

const SocialKakao = () => {

  const Rest_api_key = 'ab3a8af0dfdacf22fc47199199e5bb2f';
  const redirect_uri = `http://localhost:3000/login/oauth2/code/kakao`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${Rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
    console.log("카카오 인가코드 uri 시작")
  }

  return (
    <div className={styles.container}>
      <button className={styles.kakao__btn} onClick={handleLogin}>
      <img src={kakaoLogo} alt="Kakao_logo" className={styles.kakao__logo} />
        <p>카카오로 시작하기</p>
      </button>
    </div>
  )
}

export default SocialKakao