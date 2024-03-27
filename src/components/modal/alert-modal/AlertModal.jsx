import React from 'react'
import styles from './AlertModal.module.scss'

const AlertModal = ({ closeEvent, title, children, actionMsg, actionEvent }) => {
  return (
    <div className={styles.container}>
      <div className={styles.background}>
        <div className={styles.modalBlock}>
          <div className={styles.content}>
            <h3>{title}</h3>
            <div className={styles.msg}>{children}</div>
            <div className={styles.action_box}>
              <button onClick={closeEvent} >
                닫기
              </button>
              <button onClick={actionEvent}>
                {actionMsg}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AlertModal