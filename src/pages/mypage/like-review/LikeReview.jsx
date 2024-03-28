import React, { useEffect, useState } from 'react'
import styles from './LikeReview.module.scss'
import MainReviewCard from '../../../components/review/cards/main-card/MainReviewCard';
import * as reviewService from '../../../apis/services/reviewService';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { likedReviewState } from '../../../states/review/likeReviewState';

const LikeReview = () => {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [likedReviews, setLikedReviews] = useRecoilState(likedReviewState);
  const likeReview = true;

    // 페이지 이동을 위한 함수
    const navigateTo = (path) => () => {
      navigate(path);
    };

  const fetchLikeReviews = async () => {
    try {
        const response = await reviewService.getLikeReview(0,5);
        setReviews(response.data.data.content);
        setLikedReviews(response.data.data.content);  
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
            </div>
          </section>
          <section>
            <div className={styles.review__cards}>
              {reviews && reviews.length > 0 && reviews.map((review, i) => (
                <div className={styles.calendar__card} key={i}>
                  <MainReviewCard review={review} likeReview={likeReview}/>
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