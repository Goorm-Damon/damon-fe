import React from 'react'
import styles from './ReviewBanner.module.scss'
import { useNavigate } from 'react-router-dom';

const ReviewBanner = () => {

  const navigate = useNavigate();

  // 페이지 이동을 위한 함수
  const navigateTo = (path) => () => {
    navigate(path);
  };
  return (
    <div className={styles.banner}>
      <div className={styles.banner__item}>
        <div className={styles.titles}>
          <p className={styles.title}>
            멘트
            <br />
            뭐하지..
          </p>
          <button className={styles.review__btn} onClick={navigateTo('/register/review')}>
            리뷰 작성하기
          </button>
        </div>
        <input
          placeholder='어떤 여행을 찾으시나요?'
        />
      </div>
    </div>
  )
}

export default ReviewBanner