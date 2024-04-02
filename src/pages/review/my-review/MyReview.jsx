import React, { useEffect, useState } from 'react'
import styles from './MyReview.module.scss'
import * as reviewService from '../../../apis/services/reviewService';
import { useNavigate } from 'react-router-dom';
import MainReviewCard from '../../../components/review/cards/main-card/MainReviewCard';

const MyReview = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);

  // 페이지 이동을 위한 함수
  const navigateTo = (path) => () => {
    navigate(path);
  };

  const fetchReviews = async () => {
    try {
      const response = await reviewService.getMyReview(0,10);
      setReviews(response.data.data.content);
      console.log(reviews);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div>
      <div className={styles.page}>
        <div className={styles.review}>
        <p className={styles.main__title}>내 리뷰</p>
          {reviews ?
            <div>
              <section className={styles.review__top}>
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
            :
            <div className={styles.none__calendar}>
              리뷰를 등록해 보세요
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default MyReview