import React from 'react'
import styles from './ReviewBanner.module.scss'

const ReviewBanner = () => {
  return (
    <div className={styles.banner}>
      <div className={styles.banner__item}>
        <input
          placeholder='어떤 여행을 찾으시나요?'
        />
      </div>
    </div>
  )
}

export default ReviewBanner