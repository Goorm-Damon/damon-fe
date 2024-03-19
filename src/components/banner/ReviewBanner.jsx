import React, { useEffect, useState } from 'react';
import styles from './ReviewBanner.module.scss'
import { useNavigate } from 'react-router-dom';
import Select from "react-select";
import * as reviewService from '../../apis/services/reviewService';

const options = [
  { value: '제목', label: "제목" },
  { value: '태그', label: "태그" },
  { value: '작성자', label: "작성자" },
];

const ReviewBanner = ({reviews, setReviews}) => {

  const navigate = useNavigate();
  const [option, setOption] = useState(options[0]);
  const [content, setContent] = useState("");

  // 페이지 이동을 위한 함수
  const navigateTo = (path) => () => {
    navigate(path);
  };

  const fetchReviews = async () => {
    try {
        const response = await reviewService.getSearchReview(option.value,content, 0, 10);
        setReviews(response.data.data.content);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchReviews();
    }
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
        <div className={styles.input__container}>
          <Select
            onChange={(e) => setOption(e)}
            placeholder=""
            options={options}
            defaultValue={options[0]}
            className={styles.select}
          />
          <input
            placeholder='어떤 여행을 찾으시나요?'
            name='content'
            type='text'
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>
    </div>
  )
}

export default ReviewBanner