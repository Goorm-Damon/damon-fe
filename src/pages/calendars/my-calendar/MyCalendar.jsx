import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as calendarService from '../../../apis/services/calendarService';
import styles from './MyCalendar.module.scss';
import { useNavigate } from 'react-router-dom';

const MyCalendar = () => {
  const [calendars, setCalendars] = useState([]);
  const [edit, setEdit] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const navigate = useNavigate();

  const handleDatails = (calendarId) => () => {
    if (!edit) {
      // edit 상태가 아닐 때만 동작하도록
      navigate(`/my/calendar/${calendarId}`, { state: { calendarId: calendarId } });
    }
  };

  const handleCheckboxChange = (calendarId) => () => {
    if (selectedItems.includes(calendarId)) {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((itemId) => itemId !== calendarId)
      );
    } else {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, calendarId]);
    }
  };

  const handleEditbtn = () => {
    setEdit(!edit);
    setSelectedItems([]); // 편집 모드로 진입하면 선택한 아이템 초기화
  };

  const fetchCalendars = async () => {
    try {
      const response = await calendarService.getCalendar(0, 10);
      setCalendars(response.data);
      console.log('response', response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCalendars();
  }, []);
  useEffect(() => {
    console.log(selectedItems)
  }, [selectedItems]);


  return (
    <div>
      <div className={styles.calendar}>
        <div>
          <p className={styles.main__title}>내 일정</p>
          <div className={styles.editLine}>
            <p>Total {calendars.totalElements}</p>
            {!edit ? (
              <p className={styles.edit__btn} onClick={handleEditbtn}>
                편집
              </p>
            ) : (
              <div className={styles.btns}>
                <p onClick={handleEditbtn}>취소</p>
                <p>삭제</p>
              </div>
            )}
          </div>
        </div>
        {calendars.content &&
          calendars.content.map((item, i) => (
            <div
              className={styles.calendar__card}
              key={i}
              onClick={handleDatails(item.calendarId)}
            >
              <div className={styles.title}>
                {edit && (
                  <input
                    type="checkbox"
                    id={item.calendarId}
                    checked={selectedItems.includes(item.calendarId)}
                    onChange={handleCheckboxChange(item.calendarId)}
                  />
                )}
                {item.title}
              </div>
              <div>
                {item.startDate} ~ {item.endDate}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyCalendar;
