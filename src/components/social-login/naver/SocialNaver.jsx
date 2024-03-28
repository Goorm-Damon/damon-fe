import React from 'react'
import styles from './SocialNaver.module.scss'
import naverLogo from '../../../assets/naver_logo.png';

const SocialNaver = () => {

  const handleLogin = () => {
    window.location.href = `https://nid.naver.com/oauth2.0/authorize?client_id=${process.env.REACT_APP_NAVER_REST_API_KEY}&client_secret=${process.env.REACT_APP_NAVER_REST_API_SECRET_KEY}&redirect_uri=${process.env.REACT_APP_NAVER_REDIRECT_URI}&response_type=code`
    console.log("네이버 인가코드 uri 시작")
  }

  return (
    <div className={styles.container}>
      <button className={styles.naver__btn} onClick={handleLogin}>
      <img src={naverLogo} alt="Naver_logo" className={styles.naver__logo} />
        <p>네이버로 시작하기</p>
      </button>
    </div>
  )
}

export default SocialNaver