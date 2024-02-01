import React from 'react'
import styles from './ShowCalendar.module.scss'

const ShowCalendar = ({ calendar }) => {
  return (
    <>
      <div className={styles.container}>
        <div>
          <p>{calendar.locationName}</p>
          <div className={styles.contents}>
            <p>{calendar.memo}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShowCalendar