import React, { useEffect, useState } from 'react'
import styles from './Main.module.scss'
import Banner from '../../components/banner/Banner'
import axios from 'axios';
import * as calendarService from '../../apis/services/calendarService';
import * as reviewService from '../../apis/services/reviewService';
import * as communityService from '../../apis/services/communityService';
import CalendarCard from '../../components/calendar/cards/CalendarCard';
import { useLocation, useNavigate } from 'react-router-dom';
import ReviewCard from '../../components/review/cards/best-card/ReviewCard';
import CommunityCard from '../../components/community/cards/CommunityCard';


const getToken = localStorage.getItem('token');


const Main = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // const [user, setUser] = useState(null);
  const [calendars, setCalendars] = useState([]);
  const [bestReviews, setBestReviews] = useState([]);
  const [lightCommus, setLightCommus] = useState([]);
  const [freeCommus, setFreeCommus] = useState([]);


  const fetchCalendars = async () => {
    try {
      const response = await calendarService.getCalendar(0, 10);
      setCalendars(response.data);
      console.log("일정",calendars);
    } catch (error) {
      console.log(error);
    }
  }

  // 페이지 이동을 위한 함수
  const navigateTo = (path) => () => {
    navigate(path);
  };

  const fetchBestReviews = async () => {
    try {
      const response = await reviewService.getReview(0, 10);
      setBestReviews(response.data);
      console.log("베스트리뷰",bestReviews);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchFreecommu = async () => {
    try {
      const response = await communityService.getCommunity('자유', 0);
      setFreeCommus(response.data.data);
      console.log("자유모임",freeCommus);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchLightCommu = async () => {
    try {
      const response = await communityService.getCommunity('번개', 0);
      setLightCommus(response.data.data);
      console.log("번개모임",lightCommus);
    } catch (error) {
      console.log(error);
    }
  }



  useEffect(() => {
    fetchCalendars();
    fetchBestReviews();
    fetchFreecommu();
    fetchLightCommu();
  }, []);


  return (
    <div>
      <Banner />
      <div className={styles.main}>
        {/* {getToken && */}
        <section className={styles.preview__container}>
          <div className={styles.preview__title}>
            <h2>최근 일정</h2>
            <a onClick={navigateTo('/my/calendar')}>더 보기 {'>'}</a>
          </div>
          <div className={styles.calendars__container}>
            {calendars.content && calendars.content.slice(0, 4).map((calendar, i) => (
              <div className={styles.calendar__card} key={i}>
                <CalendarCard calendar={calendar} />
              </div>
            ))}
          </div>
        </section>
        {/* } */}
        <section className={styles.preview__container}>
          <div className={styles.preview__title}>
            <h2>베스트 리뷰</h2>
            <a>더 보기 {'>'}</a>
          </div>
          <div className={styles.calendars__container}>
            {bestReviews && bestReviews.map((bestReview, i) => (
              <div className={styles.calendar__card} key={i}>
                <ReviewCard bestReview={bestReview} />
              </div>
            ))}
          </div>
        </section>
        <div className={styles.boards}>
          <section className={styles.preview__container2}>
            <div className={styles.preview__title}>
              <h2>자유게시판</h2>
              <a>더 보기 {'>'}</a>
            </div>
            {freeCommus.content && freeCommus.content.slice(0, 4).map((freeCommu, i) => (
              <div className={styles.commu__card} key={i}>
                <CommunityCard data={freeCommu} />
              </div>
            ))}
          </section>
          <section className={styles.preview__container2}>
            <div className={styles.preview__title}>
              <h2>최근 번개 모임</h2>
              <a>더 보기 {'>'}</a>
            </div>
            {lightCommus.content && lightCommus.content.slice(0, 4).map((lightCommu, i) => (
              <div className={styles.commu__card} key={i}>
                <CommunityCard data={lightCommu} />
              </div>
            ))}
          </section>
        </div>

      </div>
    </div>
  )
}

export default Main