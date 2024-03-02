import React, { useEffect, useRef, useState } from 'react';
import styles from './ShowCalendar.module.scss';
import { FaMinus } from "react-icons/fa";
import { useRecoilState, useRecoilValue } from 'recoil';
import { calendarInfoState, filteredTravelsSelector } from './../../../states/calendar/calendarInfoState';
import { headerState } from '../../../states/header/headerState';

const ShowCalendar = ({ calendar,index,showModal,setPlaceInfo, placeInfo }) => {
  const [calendarInfo, setCalendarInfo] = useRecoilState(calendarInfoState);
  const [isHovered, setIsHovered] = useState(false);
  const headerSettings = useRecoilValue(headerState);
  const { showDetail,showModify } = headerSettings;
  const filteredTravels = useRecoilValue(filteredTravelsSelector);
  const [list, setList] = useState([]);
  const dragItem = useRef();   //드래그할 인덱스
  const dragOverItem = useRef();  //드랍할 위치의 인덱스

  // const handleModal = (item) => {
  //   setPlaceInfo({
  //     ...placeInfo,
  //     locationName: item.locationName,
  //     latitude: item.latitude,
  //     longitude: item.longitude,
  //     day: item.day,
  //   })
  //   showModal();
  // }

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

  const handleOrder = () => {

  }
      

  useEffect(() => {
    console.log(calendar);
  }, []);

  return (
    <div
      className={styles.container}
      // onClick={(e) => handleModal(calendar, e)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.titles}>
        <div className={styles.index_circle}>{index}</div>
        <p>{calendar.locationName}</p>
        {((isHovered && !showDetail) || (isHovered && showModify && showDetail)) &&(
          <div className={styles.dele_btn} onClick={handleDeleteClick}>
            <FaMinus />
          </div>
        )}
      </div>
      <div className={styles.contents}>
        <div className={styles.contents__background}></div>
        <p>{calendar.memo}</p>
      </div>
    </div>
  );
}

export default ShowCalendar;