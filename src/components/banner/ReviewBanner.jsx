import React, { useEffect, useState } from 'react';
import styles from './ReviewBanner.module.scss'
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import * as reviewService from '../../apis/services/reviewService';

const options = [
  { value: 'title', label: "제목" },
  { value: 'tag', label: "태그" },
  { value: 'nickname', label: "작성자" },
];

const ReviewBanner = ({ setReviews }) => {
  const navigate = useNavigate(); // useNavigate 훅을 사용해 navigate 함수를 정의
  const [option, setOption] = useState(options[0]);
  const [keyword, setKeyword] = useState("");


  const fetchReviews = async () => {
    try {
      // 여기서 검색 모드와 검색어에 따라 적절한 API를 호출합니다.
      const response = await reviewService.searchReviews(option.value, keyword, 0, 10);
      setReviews(response.data.data.content);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      // 오류 처리: 사용자에게 오류를 알립니다.
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

  return (
    <div className={styles.banner}>
      <div className={styles.banner__item}>
        <div className={styles.titles}>
          <p className={styles.title}>
            멘트
            <br />
            뭐하지..
          </p>
          <button className={styles.review__btn} onClick={navigateToReviewCreation}>
  리뷰 작성하기
</button>
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
      </div>
    </div>
  )
}

export default ReviewBanner