import React from 'react'
import styles from './MyPage.module.scss'

const MyPage = () => {
  return (
    <div>
      <div className={styles.page}>
        <section className={styles.profile__top}>
          <div className={styles.profile}>
            <div className={styles.profile__img}>
              <img />

            </div>
            <input className={styles.profile__nickname}/> 
            <p>편집</p>
          </div>
        </section>
        <section>
          <div className={styles.my__review}>

          </div>
          <div className={styles.my__calendar}>

          </div>
          <div className={styles.my__commu}>

          </div>
          <div className={styles.like__calendar}>

          </div>
        </section>

      </div>
    </div>
  )
}

export default MyPage