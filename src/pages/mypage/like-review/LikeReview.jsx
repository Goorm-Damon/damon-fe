import React, { useEffect, useState } from 'react'
import styles from './LikeReview.module.scss'
import MainReviewCard from '../../../components/review/cards/main-card/MainReviewCard';
import * as reviewService from '../../../apis/services/reviewService';
import { useNavigate } from 'react-router-dom';

const LikeReview = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

    // 페이지 이동을 위한 함수
    const navigateTo = (path) => () => {
      navigate(path);
    };

  const fetchLikeReviews = async () => {
    try {
        const response = await reviewService.getLikeReview(0,10);
        setReviews(response.data);  
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLikeReviews();
  }, []);

  return (
    <div>
      <div className={styles.page}>
        <div className={styles.review}>
          <section className={styles.review__top}>
            <input
              placeholder='검색어를 입력하세요'
            />
            <div className={styles.editLine}>
              <p>Total {reviews.length}</p>
              <button onClick={navigateTo('/register/review')} >+리뷰 작성</button>
            </div>
          </section>
          <section>
            <div className={styles.review__cards}>
              {reviews && reviews.length > 0 && reviews.map((review, i) => (
                <div className={styles.calendar__card} key={i}>
                  <MainReviewCard review={review} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
export default LikeReview