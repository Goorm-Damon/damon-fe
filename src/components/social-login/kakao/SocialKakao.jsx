import React from 'react'
import styles from './SocialKakao.module.scss'
import kakaoLogo from '../../../assets/Kakao_Logo.png';

const SocialKakao = () => {

  const handleLogin = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_KAKAO_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_KAKAO_REDIRECT_URI}&response_type=code`;
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