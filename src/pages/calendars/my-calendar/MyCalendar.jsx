import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as calendarService from '../../../apis/services/calendarService';
import styles from './MyCalendar.module.scss';
import { useNavigate } from 'react-router-dom';

const img_url = {
  'GAPYEONG': 'regions-img/gapyeong.svg',
  'GANGWON': 'regions-img/gangwon.svg',
  'GEYONGGI': 'regions-img/incheon.svg',
  'INCHEON': 'regions-img/incheon.svg',
  'SEOUL': 'regions-img/seoul.svg',
  'CHUNGCHEONG': 'regions-img/chungcheong.svg',
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

const MyCalendar = () => {
  const [calendars, setCalendars] = useState({ totalElements: 0, content: [] });
  const [edit, setEdit] = useState(false);
  const [selectedItems, setSelectedItems] = useState({
    calendarIds: [],
  });

  const navigate = useNavigate();

  const handleDetails = (calendarId) => () => {
    if (!edit) {
      navigate(`/my/calendar/${calendarId}`, { state: { calendarId } });
    }
  };

  const handleCheckboxChange = (calendarId) => () => {
    setSelectedItems((prevSelectedItems) => {
      const { calendarIds } = prevSelectedItems;
      if (calendarIds.includes(calendarId)) {
        return {
          calendarIds: calendarIds.filter((itemId) => itemId !== calendarId),
        };
      } else {
        return {
          calendarIds: [...calendarIds, calendarId],
        };
      }
    });
  };

  const handleEditbtn = () => {
    setEdit(!edit);
    setSelectedItems({ calendarIds: [] }); // Correctly reset to the initial structure
  };

  const handleDelete = async () => {
    try {
      const response = await calendarService.deleteSelecCalendar(selectedItems);
      // Consider refetching the calendars here to reflect the changes
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCalendars = async () => {
    try {
      const response = await calendarService.getMyCalendar(0, 10);
      setCalendars(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCalendars();
  }, []);


  return (
    <div>
      <div className={styles.calendar}>
        <p className={styles.main__title}>내 일정</p>
        {calendars ?
          <div>
            <div>
              <div className={styles.editLine}>
                <p>Total {calendars.totalElements}</p>
                {!edit ? (
                  <p className={styles.edit__btn} onClick={handleEditbtn}>
                    편집
                  </p>
                ) : (
                  <div className={styles.btns}>
                    <p onClick={handleEditbtn}>취소</p>
                    <p onClick={handleDelete}>삭제</p>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.container}>
            {calendars.content && calendars.content.map((item, i) => (
              <div>
                {edit && (
                  <input
                    type="checkbox"
                    id={item.calendarId}
                    checked={selectedItems.calendarIds.includes(item.calendarId)}
                    onChange={handleCheckboxChange(item.calendarId)}
                    className={styles.selec__input}
                  />
                )}
                <div
                  className={`${styles.calendar__card} ${edit ? styles.defaultCursor : ''}`}
                  key={i}
                  onClick={handleDetails(item.calendarId)}
                >
                  <div className={styles.calendar__left}>
                    <img src={`${process.env.PUBLIC_URL}/${img_url[item.area]}`} className={styles.area__img} />
                    <div className={styles.title}>
                      <p>{item.title}</p>
                    </div>
                    <div className={styles.card__tag}>
                      <div>#{areas[item.area]}</div>
                    </div>
                  </div>
                  <div className={styles.calendar__right}>
                      <div className={styles.date_title}>
                        <p className={styles.mini__title}>여행 시작 : </p>
                        <p>{item.startDate}</p>
                      </div>
                      <div className={styles.date_title}>
                        <p className={styles.mini__title}>여행 끝: </p>
                        <p>{item.startDate}</p>
                      </div>
                  </div>
                </div>
              </div>
            ))}
            </div>
            
          </div>
          :
          <div>
            등록된 일정이 없습니다.
          </div>
        }
      </div>
    </div>
  );
};

export default MyCalendar;
