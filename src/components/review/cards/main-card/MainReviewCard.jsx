import React, { useState } from 'react'
import styles from './MainReviewCard.module.scss'
import { FaHeart } from "react-icons/fa6";
import { FaComment } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import * as reviewService from '../../../../apis/services/reviewService';

const areas = {
  'GAPYEONG': '가평',
  'GANGWON': '강원',
  'GEYONGGI': '경기',
  'INCHEON': '인천',
  'SEOUL': '서울',
  'CHUNGCHEONG': '충청',
  'GYEONGSANG': '경상',
  'JEOLLLA': '전라',
  'JEJU': '제주',
  'ALL': '전체'
};

const MainReviewCard = ({ review }) => {

  const navigate = useNavigate();
  const [Heart, setHeart] = useState(false);

  const handleDatails = (reviewId) => () => {
    navigate(`/review/${reviewId}`, { state: { reviewId: reviewId } });
  }

  const fetchLikeReview = async () => {
    try {
      const response = await reviewService.likeReview(review.id);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className={styles.review__card}>
      <div className={styles.card__left}>
        {review.mainImage &&
          <img className={styles.imgs} src={review.mainImage} />
        }
        <div className={styles.card__img}>

          <div className={styles.card__heart}>
            {Heart ?
              <FaHeart color='#F05D67' size={25} />
              :
              <FaRegHeart size={25} onClick={fetchLikeReview} />
            }
          </div>
          <div className={styles.card__tag}>
            <div>#{areas[review.area]}</div>
          </div>
        </div>
      </div>

      <div className={styles.card__right} onClick={handleDatails(review.id)}>
        <div className={styles.user}>
          {review.createTime && review.createTime.slice(0, 10)}
        </div>
        <div className={styles.card__contents}>
          <div className={styles.user__info}>
            <p>{review.name}</p>
          </div>
          <div className={styles.title}>
            <p>{review.title}</p>
            <div className={styles.card__reaction}>
              <div>
                <FaHeart color='#F05D67' />{review.likeCount}
              </div>
              <FaComment color='#5996DD' />{review.commentCount}
              <p className={styles.view__count}>조회수 {review.viewCount}</p>
            </div>
          </div>
          <div className={styles.content}>
            <div className={styles.suggest__place}>
              <p className={styles.places__title}>추천 장소</p>
              <div className={styles.places}>
                {review.suggests.slice(0, 5).map((suggest, idx) => (
                  <p >{idx + 1}.{suggest}</p>
                ))}
              </div>
            </div>
            <div className={styles.review__cost}>
              <p className={styles.cost__title}>총 경비</p>
              <p>{review.cost}</p>
            </div>
            <div className={styles.review__tags}>
              {review.freeTags.slice(0, 8).map((freeTag, idx) => (
                <p>#{freeTag}</p>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default MainReviewCard