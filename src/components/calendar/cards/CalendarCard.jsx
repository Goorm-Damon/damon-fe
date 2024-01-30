import React from 'react';
import styles from './CalendarCard.module.scss';


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

const CalendarCard = ({ calendar }) => {
  return (
    <div className={styles.card}>
      <img src={img_url[calendar.area]} />
      <div className={styles.card__content}>
        <div className={styles.title}>
          {calendar.title.length > 10 ? calendar.title.slice(0, 10) + "..." : calendar.title}
        </div>
        <div className={styles.dates}>
          {calendar.startDate}
          ~
          {calendar.endDate}
        </div>
        <div>

        </div>

      </div>

    </div>
  )
}

export default CalendarCard