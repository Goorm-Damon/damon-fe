import React, { useEffect, useRef, useState } from 'react'
import styles from './DetailReview.module.scss'
import { useLocation } from 'react-router-dom';
import { reviewInfoState } from '../../../states/review/reviewState';
import { useRecoilState } from 'recoil';
import * as reviewService from '../../../apis/services/reviewService';
import HTMLReactParser from 'html-react-parser';
import { CiMenuKebab } from "react-icons/ci";
import DropDown from '../../../components/review/cards/drop-down/DropDown';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { likedReviewState } from '../../../states/review/likeReviewState';


const DetailReview = () => {
  const reviewId = useLocation().state.reviewId;
  const [reviewInfo, setReviewInfo] = useRecoilState(reviewInfoState);
  const [click, setClick] = useState(false);
  const [heart, setHeart] = useState(false);
  const [likedReviews, setLikedReviews] = useRecoilState(likedReviewState);
  const dropdownRef = useRef(null);

  const handleMenu = () => setClick(!click);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setClick(false);
    }
  };

  const fetchDetailReview = async () => {
    try {
      const response = await reviewService.getDetailReview(reviewId);
      setReviewInfo(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchLikeReview = async () => {
    try {
      const response = await reviewService.likeReview(reviewId);
      const isLiked = likedReviews.includes(reviewId);
      if (isLiked) {
        setLikedReviews(likedReviews.filter(id => id !== reviewId));
      } else {
        setLikedReviews([...likedReviews, reviewId]);
      }
      setHeart(!heart);
    } catch (error) {
      console.error('Error toggling like for review:', error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.addEventListener('click', handleClickOutside);
    fetchDetailReview();
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div>
      <div className={styles.page}>
        <div className={styles.user__info}>
          <div className={styles.user__profile}>
            <div className={styles.profile__img}>
              <img />
            </div>
            <p>{reviewInfo.name}</p>
          </div>
          <div ref={dropdownRef} className={styles.menu__Btn} onClick={handleMenu}>
            <CiMenuKebab />
          </div>
        </div>
        {click && <DropDown />}
        <section>
          <div className={styles.image__box}>
            {reviewInfo.imageUrls && <img className={styles.images} src={reviewInfo.imageUrls[0]} />}
          </div>
          <div className={styles.icons}>
            {heart ? (
              <FaHeart color='#F05D67' size={25} className={styles.icon} onClick={fetchLikeReview} />
            ) : (
              <FaRegHeart size={25} className={styles.icon} onClick={fetchLikeReview} />
            )}
            <FaRegComment className={styles.icon} size={25} />
            <IoMdShare className={styles.icon} size={25} />
          </div>
        </section>
        <section className={styles.page__contents}>
          <div className={styles.Title}>
            <p className={styles.category__name}>제목</p>
            <p>{reviewInfo.title}</p>
          </div>
          <div className={styles.dates}>
            <p className={styles.category__name}>여행 기간</p>
            <p>
              {reviewInfo.startDate} ~ {reviewInfo.endDate}
            </p>
          </div>
          <div className={styles.cost}>
            <p className={styles.category__name}>총 경비</p>
            <p>{reviewInfo.cost}</p>
          </div>
          <div className={styles.suggest__places}>
            <p className={styles.category__name}>추천 장소</p>
            {reviewInfo.suggests.map((suggest, idx) => (
              <p key={idx}>{idx + 1}. {suggest}</p>
            ))}
          </div>
          <div className={styles.contents}>
            <p className={styles.category__name}>리뷰 내용</p>
            <div>{HTMLReactParser(reviewInfo.content)}</div>
          </div>
          <div className={styles.free__tags}>
            {reviewInfo.freeTags.map((tag, idx) => (
              <p key={idx}>#{tag} </p>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default DetailReview;