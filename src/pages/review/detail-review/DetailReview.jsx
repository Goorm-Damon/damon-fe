import React, { useEffect } from 'react'
import styles from './DetailReview.module.scss'
import { useLocation } from 'react-router-dom';
import { reviewInfoState } from '../../../states/review/reviewState';
import { useRecoilState } from 'recoil';
import * as reviewService from '../../../apis/services/reviewService';
import ReactHtmlParser from 'html-react-parser';


const DetailReview = () => {

  const reviewId = useLocation().state.reviewId;
  const [reviewInfo, setReviewInfo] = useRecoilState(reviewInfoState);

  useEffect(() => {
    fetchDetailReview();
  }, []);

  const fetchDetailReview = async () => {
    try {
      const response = await reviewService.getDetailReview(reviewId);
      setReviewInfo(response.data);
      console.log(reviewInfo);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      <div className={styles.page}>
        <section>
          <div className={styles.images}>
          </div>
        </section>
        <section className={styles.page__contents}>
          <div className={styles.Title}>
            <p className={styles.category__name}>제목</p>
            <p>{reviewInfo.title}</p>
          </div>
          <div className={styles.dates}>
            <p className={styles.category__name}>여행 기간</p>
            <p>{reviewInfo.startDate} ~ {reviewInfo.endDate}</p>
          </div>
          <div className={styles.cost}>
            <p className={styles.category__name}>총 경비</p>
            <p>{reviewInfo.cost}</p>
          </div>
          <div className={styles.suggest__places}>
            <p className={styles.category__name}>추천 장소</p>
            {reviewInfo.suggests.map((suggest, idx) => (
              <p >{idx + 1}. {suggest}</p>
            ))}
          </div>
          <div className={styles.contents}>
            <p className={styles.category__name}>리뷰 내용</p>
            <div>{ReactHtmlParser(reviewInfo.content)}</div>
          </div>
        </section>

      </div>
    </div>
  )
}

export default DetailReview