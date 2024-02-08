import React, { useEffect, useState } from 'react'
import styles from './ReviewCard.module.scss'
import * as reviewService from '../../../../apis/services/reviewService';


const ReviewCard = ({ bestReview }) => {

  const [contents, setContents] = useState(
    {
      id: 1,
      createTime: "2024-02-02T07:45:18.652676Z",
      state: "",
      likeCount: 0,
      viewCount: 30,
      title: "string",
      startDate: "2024-02-02",
      endDate: "2024-02-02",
      area: "GAPYEONG",
      cost: 0,
      suggests: ["string"],
      freeTags: ["string"],
      content: "string",
      reviewComments: [],
    });

  const fetchDetailReview = async () => {
    try {
      const response = await reviewService.getDetailReview(bestReview.id);
      setContents(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchDetailReview();
  }, []);


  return (
    <div className={styles.card}>
      {/* <img src={} /> */}
      <div className={styles.card__title}>
        <div className={styles.title}>
          {contents.title.length > 10 ? contents.title.slice(0, 10) + "..." : contents.title}
        </div>
        <div className={styles.dates}>
          {contents.startDate} ~ {contents.endDate}
        </div>
      </div>
      <div className={styles.card__content}>
        {contents.content.length > 20 ? contents.content.slice(0, 20) + "..." : contents.content}
      </div>
    </div>
  )
}

export default ReviewCard