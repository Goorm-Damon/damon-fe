import React, { useEffect, useState } from 'react'
import axios from 'axios';
import * as calendarService from '../../../apis/services/calendarService';
import styles from './MyCalendar.module.scss'

const MyCalendar = () => {

  const [calendars, setCalendars] = useState([]);


  const fetchCalendars = async () => {
    try {
      const response = await calendarService.getCalendar(0, 10);
      setCalendars(response.data);
      console.log("response",response);
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    fetchCalendars();
  }, []);

  return (
    <div>
      <div className={styles.calendar}>
        <div>
          <p className={styles.main__title}>내 일정</p>
          {/* <p>Total {calendars.totalElements}</p> */}
        </div>
        {/* {calendars.content && calendars.content.map((item, i) => (
          <div className={styles.calendar__card}>
            <div className={styles.title}>
              {item.title}
            </div>
            <div>
              {item.startDate}
              ~
              {item.endDate}
            </div>
          </div>
        ))} */}
      </div>
    </div>
  )
}

export default MyCalendar