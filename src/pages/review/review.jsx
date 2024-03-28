import React, { useEffect, useState } from 'react'; // 헤더 컴포넌트를 올바른 경로에서 임포트
import styles from './review.module.scss'; // 리뷰 페이지의 스타일
import * as reviewService from '../../apis/services/reviewService';
import AreaSidebar from '../../components/sidebars/area-sidebar/AreaSidebar';
import MainReviewCard from '../../components/review/cards/main-card/MainReviewCard';
import { useNavigate } from 'react-router-dom';
import ReviewBanner from '../../components/banner/ReviewBanner';
import Select from "react-select";
import { FiEdit3 } from "react-icons/fi";

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

const options = [
  { value: 'title', label: "제목" },
  { value: 'tag', label: "태그" },
  { value: 'nickname', label: "작성자" },
];

const Review = () => {

  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [area, setArea] = useState('ALL');
  const [option, setOption] = useState(options[0]);
  const [keyword, setKeyword] = useState("");

  // 페이지 이동을 위한 함수
  const navigateTo = (path) => () => {
    navigate(path);
  };

  const fetchReviews = async () => {
    try {
      if (area == 'ALL') {
        const response = await reviewService.getReview(0, 10);
        console.log(response);
        setReviews(response.data.data.content);
      } else {
        const response = await reviewService.getAreaReview(0, 10, area);
        setReviews(response.data.data.content);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchReviews();
    }
  };

  // 리뷰 작성 페이지로 이동하는 함수
  const navigateToReviewCreation = () => {
    navigate('/register/review');
  };

  useEffect(() => {
    fetchReviews();
    // window.scrollTo(0, 1200);
  }, [area]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* <ReviewBanner reviews={reviews} setReviews={setReviews} /> */}
      <div className={styles.page}>
          <section className={styles.review__top}>
            <AreaSidebar setArea={setArea} area={area} />
            <div className={styles.editLine}>
              <p>Total {reviews.length}</p>
              <div className={styles.review__btn}>
              <FiEdit3 />
              <span>리뷰작성</span>
              </div>
            </div>
            <div className={styles.input__container}>
              <Select
                onChange={(selectedOption) => setOption(selectedOption)}
                options={options}
                defaultValue={options[0]}
                className={styles.select}
              />
              <input
                placeholder='어떤 여행을 찾으시나요?'
                type='text'
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyPress}
                className={styles.searchInput}
              />
            </div>
          </section>
          {reviews.length > 0 ?
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
              리뷰를 등록해보세요
            </div>
          }

        </div>
    </div>
  );
};

export default Review;