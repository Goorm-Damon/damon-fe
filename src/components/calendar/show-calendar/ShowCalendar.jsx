import React, { useEffect, useState } from 'react';
import styles from './ShowCalendar.module.scss';
import { FaMinus } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from 'recoil';
import { calendarInfoState } from './../../../states/calendar/calendarInfoState';
import { headerState } from '../../../states/header/headerState';

const ShowCalendar = ({ calendar }) => {
  const [calendarInfo, setCalendarInfo] = useRecoilState(calendarInfoState);
  const [isHovered, setIsHovered] = useState(false);
  const headerSettings = useRecoilValue(headerState);
  const { showDetail } = headerSettings;

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const delCalender_modify = () => {
    const updatedTravels = calendarInfo.travels.map(item => {
      if (item.locationName === calendar.locationName) {
        // locationName이 같을 경우 deleted를 true로 설정
        return { ...item, deleted: true };
      }
      return item;
    });
    setCalendarInfo({ ...calendarInfo, travels: updatedTravels });
  };

  const delCalender = () => {
    const updatedTravels = calendarInfo.travels.filter(item => item.locationName !== calendar.locationName);
    setCalendarInfo({ ...calendarInfo, travels: updatedTravels });
  };

  const handleDeleteClick = () => {
    if (showDetail) {
      delCalender_modify();
    } else {
      delCalender();
    }
  };

  useEffect(() => {
    console.log(calendar);
  }, []);

  return (
    <div
      className={styles.container}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.titles}>
        <p>{calendar.locationName}</p>
        {isHovered && (
          <div className={styles.dele_btn} onClick={handleDeleteClick}>
            <FaMinus />
          </div>
        )}
      </div>
      <div className={styles.contents}>
        <p>{calendar.memo}</p>
      </div>
    </div>
  );
}

export default ShowCalendar;
