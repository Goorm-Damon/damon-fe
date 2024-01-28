import React from 'react'
import styles from './ShowCalendar.module.scss'
import { FaMinus } from "react-icons/fa";
import { useRecoilState } from 'recoil';
import { calendarInfoState } from './../../../states/calendar/calendarInfoState';

const ShowCalendar = ({ calendar }) => {
  const [calendarInfo, setCalendarInfo] = useRecoilState(calendarInfoState);

  const delCalender = () => {
    const updatedTravels = calendarInfo.travels.filter(item => item.locationName !== calendar.locationName);
    setCalendarInfo({ ...calendarInfo, travels: updatedTravels });
  };

  return (
    <div className={styles.container}>
      <div className={styles.titles}>
        <p>{calendar.locationName}</p>
        <div className={styles.dele_btn} onClick={delCalender}>
          <FaMinus />
        </div>
      </div>
      <div className={styles.contents}>
        <p>{calendar.memo}</p>
      </div>
    </div>
  );
}

export default ShowCalendar;