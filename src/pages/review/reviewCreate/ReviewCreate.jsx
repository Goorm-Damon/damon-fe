import React from 'react';
import styles from './ReviewCreate.module.scss'; // 변경된 파일 이름에 맞게 import 경로도 수정

export default function ReviewCreate() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>리뷰 작성하기</div>
      <div className={styles.inputWrapper}>
        <div className={styles.label}>제목</div>
        <input className={styles.subject} type="text" placeholder="제목을 작성해주세요." />
      </div>
      <div className={styles.writerWrapper}>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>여행 기간</div>
          <input className={styles.writer} type="text" placeholder="이름을 적어주세요." />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>임의의 설정</div>
          <input className={styles.password} type="password" placeholder="비밀번호를 작성해주세요." />
        </div>
      </div>
      <div className={styles.writerWrapper}>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>여행 기간</div>
          <input className={styles.writer} type="text" placeholder="이름을 적어주세요." />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>임의의 설정</div>
          <input className={styles.password} type="password" placeholder="비밀번호를 작성해주세요." />
        </div>
      </div>
      <div className={styles.writerWrapper}>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>여행 기간</div>
          <input className={styles.writer} type="text" placeholder="이름을 적어주세요." />
        </div>
        <div className={styles.inputWrapper}>
          <div className={styles.label}>임의의 설정</div>
          <input className={styles.password} type="password" placeholder="비밀번호를 작성해주세요." />
        </div>
      </div>
      <div className={styles.imageWrapper}>
        <div className={styles.label}>사진첨부</div>
        <button className={styles.uploadButton}>+</button>
        <button className={styles.uploadButton}>+</button>
        <button className={styles.uploadButton}>+</button>
      </div>
      <div className={styles.inputWrapper}>
        <div className={styles.label}>내용</div>
        <textarea className={styles.contents} placeholder="내용을 작성해주세요."></textarea>
      </div>
      <div className={styles.buttonWrapper}>
        <button className={styles.cancelButton}>취소하기</button>
        <button className={styles.submitButton}>등록하기</button>
      </div>
    </div>
  );
}