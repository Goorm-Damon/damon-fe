import React from 'react';
import styles from './CalendarCard.module.scss';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { getCalendarIdState } from '../../../states/calendar/calendarInfoState';


const img_url = {
  'GAPYEONG': 'regions-img/gapyeong.svg',
  'GANGWON': 'regions-img/gangwon.svg',
  'GEYONGGI': 'regions-img/geyonggi.svg',
  'INCHEON': 'regions-img/incheon.svg',
  'SEOUL': 'regions-img/seoul.svg',
  'CHUNGCHEONG': 'regions-img/chungcheon.svg',
  'GYEONGSANG': 'regions-img/gyeongsang.svg',
  'JEOLLLA': 'regions-img/jeolla.svg',
  'JEJU': 'regions-img/jeju.svg',
};

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


const CalendarCard = ({ calendar }) => {

  const navigate = useNavigate();
  const [calenderId, setCalenderId] = useRecoilState(getCalendarIdState);


  const handleDatails = (calendarId) => () => {
    setCalenderId(calendarId);
    navigate(`/my/calendar/${calendarId}`, { state: { calendarId: calendarId } });
  }



  return (
    <div className={styles.container} onClick={handleDatails(calendar.calendarId)}>
      <div className={styles.calendar__card}>
        <div className={styles.calendar__left}>
          <img src={img_url[calendar.area]} className={styles.area__img} />
          <div className={styles.title}>
            <p>{calendar.title}</p>
          </div>
          <div className={styles.card__tag}>
            <div>#{areas[calendar.area]}</div>
          </div>
        </div>
        <div className={styles.calendar__right}>
          <div className={styles.date_title}>
            <p className={styles.mini__title}>여행 시작 : </p>
            <p>{calendar.startDate}</p>
          </div>
          <div className={styles.date_title}>
            <p className={styles.mini__title}>여행 끝: </p>
            <p>{calendar.startDate}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CalendarCard