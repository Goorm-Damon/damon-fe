import React from 'react'
import styles from './MyPage.module.scss'
import { useRecoilState } from 'recoil';
import { userInfostate } from '../../states/user/userInfoState';

const MyPage = () => {

  const [userInfo, setUserInfo] = useRecoilState(userInfostate);

  return (
    <div>
      <div className={styles.page}>
        {/* <section className={styles.profile__top}> */}
          <div className={styles.profile}>
            <div className={styles.profile__img}>
              <img src='http://k.kakaocdn.net/dn/PuLy5/btspnj8u2Ea/AKLyA55O7xWdWq8ZItsnD0/img_640x640.jpg' />
            </div>
            <div className={styles.profile__right}>
              <input 
              className={styles.profile__nickname} 
              readOnly
              value={userInfo.data.nickname}/>
              {/* <p>편집</p> */}
            </div>
          </div>
        {/* </section> */}
        <section className={styles.my__contents}>
          <div className={styles.menu__container}>
            <p>내가 쓴 리뷰</p>
          </div>
          <div className={styles.menu__container}>
            <p>내 여행 일정</p>
          </div>
          <div className={styles.menu__container}>
            <p>내가 작성 한 커뮤니티</p>
          </div>
          <div className={styles.menu__container}>
            <p>좋아요 한 게시글</p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default MyPage