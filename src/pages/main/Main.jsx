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
import { useRecoilState } from 'recoil';
import { userInfostate } from '../../states/user/userInfoState';
import MainReviewCard from '../../components/review/cards/main-card/MainReviewCard';



const getToken = localStorage.getItem('accessToken');


const Main = () => {

  const navigate = useNavigate();
  const location = useLocation();

  // const [user, setUser] = useState(null);
  const [calendars, setCalendars] = useState([]);
  const [bestReviews, setBestReviews] = useState([]);
  const [lightCommus, setLightCommus] = useState([]);
  const [freeCommus, setFreeCommus] = useState([]);
  const [userInfo, setUserInfo] = useRecoilState(userInfostate);


  const fetchCalendars = async () => {
    try {
      const response = await calendarService.getCalendar();
      setCalendars(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const navigateTo = (path) => () => {
    navigate(path);
  };

  const fetchBestReviews = async () => {
    try {
      const response = await reviewService.getBestReview();
      setBestReviews(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchFreecommu = async () => {
    try {
      const response = await communityService.getCommunity('자유', 0);
      setFreeCommus(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchLightCommu = async () => {
    try {
      const response = await communityService.getCommunity('번개', 0);
      setLightCommus(response.data.data);
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
        {userInfo.accessToken &&
          <section className={styles.preview__container}>
            <div className={styles.preview__title}>
              <h2>최근 일정</h2>
              <a onClick={navigateTo('/my/calendar')}>더 보기 {'>'}</a>
            </div>
            <div className={styles.calendars__container}>
              {calendars && calendars.slice(0, 4).map((calendar, i) => (
                <div className={styles.calendar__card} key={i}>
                  <CalendarCard calendar={calendar} />
                </div>
              ))}
            </div>
            {(calendars.length<=0) &&
              <div className={styles.none__calendar}>
                <p>일정을 추가해 보세요</p>
              </div>
            }
          </section>
        }
        <section className={styles.preview__container}>
          <div className={styles.preview__title}>
            <h2>베스트 리뷰</h2>
            <a onClick={navigateTo('/review')}>더 보기 {'>'}</a>
          </div>
          <div className={styles.calendars__container}>
            {bestReviews && bestReviews.map((bestReview, i) => (
              <MainReviewCard key={i} review={bestReview} />
            ))}
          </div>
        </section>
        <div className={styles.boards}>
          <section className={styles.preview__container2}>
            <div className={styles.preview__title}>
              <h2>자유게시판</h2>
              <a>더 보기 {'>'}</a>
            </div>
            <div className={styles.commu__container}>
              {freeCommus.content && freeCommus.content.slice(0, 4).map((freeCommu, i) => (
                <div className={styles.commu__card} key={i}>
                  <CommunityCard data={freeCommu} />
                </div>
              ))}
            </div>
          </section>
          <section className={styles.preview__container2}>
            <div className={styles.preview__title}>
              <h2>최근 번개 모임</h2>
              <a>더 보기 {'>'}</a>
            </div>
            <div className={styles.commu__container}>
              {lightCommus.content && lightCommus.content.slice(0, 4).map((lightCommu, i) => (
                <div className={styles.commu__card} key={i}>
                  <CommunityCard data={lightCommu} />
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Main