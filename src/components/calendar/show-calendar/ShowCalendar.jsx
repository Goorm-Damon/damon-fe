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
  const delCalendar_modify = () => {
    // 일단 모든 아이템에 대해 deleted 처리를 적용
    const markDeletedTravels = calendarInfo.travels.map(item => {
      if (item.order === calendar.order && item.day === calendar.day) {
        return { ...item, deleted: true };
      }
      return item;
    });
  
    // day별로 그룹화
    const groupedByDay = markDeletedTravels.reduce((acc, item) => {
      (acc[item.day] = acc[item.day] || []).push(item);
      return acc;
    }, {});
  
    // 각 그룹 내에서 deleted가 아닌 아이템들만 order를 재정렬
    Object.keys(groupedByDay).forEach(day => {
      const filteredAndSorted = groupedByDay[day]
        .filter(item => !item.deleted) // deleted가 아닌 아이템만 필터링
        .sort((a, b) => a.order - b.order) // order 기준 정렬
        .map((item, index) => ({ ...item, order: index })); // order 재할당
  
      // 재정렬된 아이템들을 다시 그룹에 할당
      groupedByDay[day] = [...filteredAndSorted, ...groupedByDay[day].filter(item => item.deleted)];
    });
  
    // 모든 그룹을 하나의 배열로 합침
    const finalTravels = Object.values(groupedByDay).flat();
  
    setCalendarInfo({ ...calendarInfo, travels: finalTravels });
  };
  
  
  
  const delCalendar = () => {
    // 삭제할 캘린더를 제외한 캘린더들을 필터링
    const filteredTravels = calendarInfo.travels.filter(item => !(item.order === calendar.order && item.day === calendar.day));
  
    // day별로 그룹화
    const groupedByDay = filteredTravels.reduce((acc, item) => {
      (acc[item.day] = acc[item.day] || []).push(item);
      return acc;
    }, {});
  
    // 각 그룹 내에서 order 재정렬
    Object.keys(groupedByDay).forEach(day => {
      groupedByDay[day].sort((a, b) => a.order - b.order); // 먼저 기존의 order에 따라 정렬
      groupedByDay[day] = groupedByDay[day].map((item, index) => ({
        ...item,
        order: index // 현재 인덱스를 새로운 order로 설정
      }));
    });
  
    // 모든 그룹을 하나의 배열로 합침
    const updatedTravels = Object.values(groupedByDay).flat();
  
    // calendarInfo 상태를 업데이트
    setCalendarInfo({ ...calendarInfo, travels: updatedTravels });
  };
  
  

  const handleDeleteClick = () => {
    if (showDetail) {
      delCalendar_modify();
    } else {
      delCalendar();
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