import React, { useEffect, useState } from 'react'
import styles from './Main.module.scss'
import Banner from '../../components/banner/Banner'
import axios from 'axios';
import * as calendarService from '../../apis/services/calendarService';
// import ScheduleCard from '../../components/card/schedule/ScheduleCard';
// import { bestReviews } from './../../mocks/handlers/best_reviews';

const Main = () => {

  // const [user, setUser] = useState(null);
  const [calendars, setCalendars] = useState([]);
  // const [bestReviews, setBestReviews] = useState([]);


  const fetchCalendars = async () => {
    try {
      const response = await calendarService.getCalendar();
      setCalendars(response.data);
    } catch(error) {
      console.log(error);
    }
  }

  // const fetchBestReviews = async () => {
  //   try {
  //     const response = await axios.get('bestReviews');
  //     setBestReviews(response.data);
  //   } catch(error) {
  //     console.log(error);
  //   }
  // }


  useEffect(()=> {
    fetchCalendars();
  },[]);
  return (
    <div>
      <Banner />
      <div className={styles.main}>
        <section className={styles.preview__container}>
          <div className={styles.preview__title}>
            <h2>최근 일정</h2>
            <a>더 보기 {'>'}</a>
          </div>
          {/* <div className={styles.card__area}>
            <ScheduleCard schedules={schedules}  />
          </div> */}
        </section>
        <section className={styles.preview__container}>
          <div className={styles.preview__title}>
            <h2>베스트 리뷰</h2>
            <a>더 보기 {'>'}</a>
          </div>
        </section>
        <div className={styles.boards}>
          <section className={styles.preview__container2}>
            <div className={styles.preview__title}>
              <h2>자유게시판</h2>
              <a>더 보기 {'>'}</a>
            </div>
          </section>
          <section className={styles.preview__container2}>
            <div className={styles.preview__title}>
              <h2>최근 번개 모임</h2>
              <a>더 보기 {'>'}</a>
            </div>
          </section>
        </div>

      </div>
    </div>
  )
}

export default Main