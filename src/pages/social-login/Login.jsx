import React from 'react'
import styles from './Login.module.scss'
import SocialKakao from '../../components/social-login/kakao/SocialKakao';
import SocialNaver from '../../components/social-login/naver/SocialNaver';

const Login = () => {
  return (
    <div>
      <div className={styles.page}>
        <div>
          <div className={styles.title}>
            <p className={styles.pj__title}>DAMON</p>
            <div className={styles.description}>
              <p>자주 사용하는 아이디로 간편하게</p>
              <p>다몬 서비스에 가입하실 수 있습니다.</p>
            </div>

          </div>
          <div className={styles.btns}>
            <SocialNaver />
            <SocialKakao />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login