import React from 'react';
import styles from './ReviewCreate.module.scss';

export default function ReviewCreate() {
  // 작성자, 비밀번호, 주소, 유튜브 필드가 제거됨
  // 내용 박스와 버튼 스타일이 변경됨

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>리뷰 작성하기</div>
      <div className={styles.inputWrapper}>
        <div className={styles.label}>리뷰 제목</div>
        <input className={styles.subject} type="text" placeholder="제목을 작성해주세요." />
      </div>
      <div className={styles.inputWrapper}>
        <div className={styles.label}>여행 기간</div>
        <input className={styles.subject} type="text" placeholder="제목을 작성해주세요." />
      </div>
      <div className={styles.inputWrapper}>
        <div className={styles.label}>리뷰 내용</div>
        <textarea className={styles.contents} placeholder="내용을 작성해주세요."></textarea>
      </div>
      {/* 주소와 유튜브 입력 필드 삭제 */}
      {/* 사진첨부 부분 유지 */}
      <div className={styles.imageWrapper}>
        <div className={styles.label}>사진첨부</div>
        {/* <button className={styles.uploadButton}>+</button>
        <button className={styles.uploadButton}>+</button>
        <button className={styles.uploadButton}>+</button> */}
      </div>
      {/* 메인설정 부분 유지 */}
      {/* <div className={styles.optionWrapper}> */}
        {/* <div className={styles.label}>메인설정</div>
        <input className={styles.radioButton} type="radio" id="youtube" name="radio-button" />
        <label className={styles.radioLabel} htmlFor="youtube">유튜브</label>
        <input className={styles.radioButton} type="radio" id="image" name="radio-button" />
        <label className={styles.radioLabel} htmlFor="image">사진</label>
      </div> */}
      {/* 버튼 위치 변경 */}
      <div className={styles.buttonWrapper}>
        <button className={styles.cancelButton}>취소</button>
        <button className={styles.submitButton}>등록하기</button>
      </div>
    </div>
  );
}