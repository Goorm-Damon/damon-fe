import React, { useEffect, useState } from 'react'
import styles from './ReviewCard.module.scss'
import * as reviewService from '../../../../apis/services/reviewService';
import { useNavigate } from 'react-router-dom';
import ReactHtmlParser from 'html-react-parser';


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

  const navigate = useNavigate();

  const handleDatails = (reviewId) => () => {
    navigate(`/review/${reviewId}`, { state: { reviewId: reviewId } });
  }

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
    <div className={styles.card} onClick={handleDatails(bestReview.id)}>
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
        {/* {ReactHtmlParser(contents.content).length > 20 ? ReactHtmlParser(contents.content).slice(0, 20) + "..." : ReactHtmlParser(contents.content)} */}
      </div>
    </div>
  )
}

export default ReviewCard