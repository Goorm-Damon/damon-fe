import React, { useEffect, useState } from 'react';
import axios from 'axios';
import * as calendarService from '../../../apis/services/calendarService';
import styles from './MyCalendar.module.scss';
import { useNavigate } from 'react-router-dom';

const MyCalendar = () => {
  // Assuming calendars will have a structure { totalElements: number, content: array }
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
      console.log('response', response);
      // Consider refetching the calendars here to reflect the changes
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCalendars = async () => {
    try {
      const response = await calendarService.getCalendar(0, 10);
      setCalendars(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCalendars();
  }, []);

  useEffect(() => {
    console.log(selectedItems);
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
                <p onClick={handleDelete}>삭제</p>
              </div>
            )}
          </div>
        </div>
        {calendars.content.map((item, i) => (
          <div
            className={styles.calendar__card}
            key={i}
            onClick={handleDetails(item.calendarId)}
          >
            <div className={styles.title}>
              {edit && (
                <input
                  type="checkbox"
                  id={item.calendarId}
                  checked={selectedItems.calendarIds.includes(item.calendarId)}
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
