import React from 'react'
import styles from './MyPage.module.scss'

const MyPage = () => {
  return (
    <div>
      <div className={styles.page}>
        {/* <section className={styles.profile__top}> */}
          <div className={styles.profile}>
            <div className={styles.profile__img}>
              <img />

            </div>
            <div className={styles.profile__right}>
              <input className={styles.profile__nickname} />
              <p>편집</p>
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