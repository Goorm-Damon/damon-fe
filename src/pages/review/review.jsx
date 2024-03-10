import React, { useEffect, useState } from 'react'; // 헤더 컴포넌트를 올바른 경로에서 임포트
import styles from './review.module.scss'; // 리뷰 페이지의 스타일
import * as reviewService from '../../apis/services/reviewService';
import AreaSidebar from '../../components/sidebars/area-sidebar/AreaSidebar';
import MainReviewCard from '../../components/review/cards/main-card/MainReviewCard';
import { useNavigate } from 'react-router-dom';
import ReviewBanner from '../../components/banner/ReviewBanner';

const areas = [
  { value: 'ALL', label: "전체" },
  { value: 'GAPYEONG', label: "가평" },
  { value: 'GANGWON', label: "강원" },
  { value: 'GEYONGGI', label: "경기" },
  { value: 'INCHEON', label: "인천" },
  { value: 'SEOUL', label: "서울" },
  { value: 'CHUNGCHEONG', label: "충청" },
  { value: 'GYEONGSANG', label: "경상" },
  { value: 'JEOLLLA', label: "전라" },
  { value: 'JEJU', label: "제주" },
];

const Review = () => {

  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [area, setArea] = useState('ALL');

  // 페이지 이동을 위한 함수
  const navigateTo = (path) => () => {
    navigate(path);
  };

  const fetchReviews = async () => {
    try {
      if (area == 'ALL') {
        const response = await reviewService.getReview(0, 10);
        setReviews(response.data);
      } else {
        const response = await reviewService.getAreaReview(0, 10, area);
        setReviews(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviews();
    window.scrollTo(0, 1200);
  }, [area]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <ReviewBanner />
      <div className={styles.page}>
        <div className={styles.review}>
          <section className={styles.review__top}>
            <AreaSidebar setArea={setArea} area={area} />
            <div className={styles.editLine}>
              <p>Total {reviews.length}</p>
              <button onClick={navigateTo('/register/review')} >+리뷰 작성</button>
            </div>
          </section>
          {reviews ?
            <section>
              <div className={styles.review__cards}>
                {reviews && reviews.length > 0 && reviews.map((review, i) => (
                  <div className={styles.calendar__card} key={i}>
                    <MainReviewCard review={review} />
                  </div>
                ))}
              </div>
            </section>
            :
            <div className={styles.none__review}>
              첫 리뷰를 등록해보세요
            </div>
          }

        </div>
      </div>
    </div>
  );
};

export default Review;