import React, { useEffect, useState } from 'react'; // 헤더 컴포넌트를 올바른 경로에서 임포트
import styles from './review.module.scss'; // 리뷰 페이지의 스타일
import * as reviewService from '../../apis/services/reviewService';
import AreaSidebar from '../../components/sidebars/area-sidebar/AreaSidebar';
import MainReviewCard from '../../components/review/cards/main-card/MainReviewCard';
import { useNavigate } from 'react-router-dom';

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

  const fetchCalendars = async () => {
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
    fetchCalendars();
  }, [area]);

  return (
    <div>
      <div className={styles.page}>
        <AreaSidebar setArea={setArea} area={area} />
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
};

export default Review;