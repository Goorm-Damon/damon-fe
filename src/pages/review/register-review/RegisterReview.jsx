import React, { useState } from 'react';
import styles from './RegisterReview.module.scss';
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState } from 'recoil';
import { reviewInfoState } from '../../../states/review/reviewState';
import { useNavigate } from 'react-router-dom';
import * as reviewService from '../../../apis/services/reviewService';

const areas = [
  { value: 'GAPYEONG', label: "가평" },
  { value: 'GANGWON', label: "강원" },
  { value: 'GEYONGGI', label: "경기" },
  { value: 'INCHEON', label: "인천" },
  { value: 'SEOUL', label: "서울" },
  { value: 'CHUNGCHEONG', label: "충청" },
  { value: 'GYEONGSANG', label: "경상" },
  { value: 'JEOLLLA', label: "전라" },
  { value: 'JEJU', label: "제주" },
];

const RegisterReview = () => {
  const navigate = useNavigate();
  const [reviewInfo, setReviewInfo] = useState({
    title: "",
    startDate: null,
    endDate: null,
    area: "",
    cost: '',
    suggests: [],
    freeTags: [],
    content: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleAreaChange = selectedOption => {
    setReviewInfo(prev => ({ ...prev, area: selectedOption ? selectedOption.value : '' }));
  };

  const handleDateChange = ([start, end]) => {
    setReviewInfo(prev => ({ ...prev, startDate: start, endDate: end }));
  };

  const handleAddPlace = () => {
    setReviewInfo(prev => ({ ...prev, suggests: [...prev.suggests, ''] }));
  };

  const handlePlaceChange = (value, index) => {
    const updatedPlaces = reviewInfo.suggests.map((item, idx) => idx === index ? value : item);
    setReviewInfo(prev => ({ ...prev, suggests: updatedPlaces }));
  };

  const handleRemovePlace = index => {
    const filteredPlaces = reviewInfo.suggests.filter((_, idx) => idx !== index);
    setReviewInfo(prev => ({ ...prev, suggests: filteredPlaces }));
  };

  const handleSubmit = async () => {
    try {
      console.log(reviewInfo);
      const response = await reviewService.createReview(reviewInfo);
      if (response.success) {
        alert("리뷰 등록되었습니다.");
        //상세 리뷰 페이지로 이동해야함.
      } else {
        console.error(response.error);
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <div className={styles.page}>
        <h1 className={styles.page__title}>리뷰 작성하기</h1>

        <div className={styles.review__title}>
          <p>리뷰 제목 <span className={styles.required}>*필수 입력사항입니다.</span></p>
          <input name="title" type="text" value={reviewInfo.title} onChange={handleInputChange} placeholder="제목을 입력해주세요" />
        </div>

        <div className={styles.review__dates}>
          <p>여행 기간 <span className={styles.required}>*필수 입력사항입니다.</span></p>
          <DatePicker
            selectsRange={true}
            startDate={reviewInfo.startDate}
            endDate={reviewInfo.endDate}
            onChange={handleDateChange}
            dateFormat="yyyy/MM/dd"
          />
        </div>
        <div className={styles.area__cost}>
          <div className={styles.review__area}>
            <p>지역 카테고리 <span className={styles.required}>*필수 입력사항입니다.</span></p>
            <Select
              onChange={handleAreaChange}
              options={areas}
              placeholder="지역을 선택해주세요"
              isClearable
            />
          </div>

          <div className={styles.review__expense}>
            <p>총 경비</p>
            <input name="cost" type="text" value={reviewInfo.cost} onChange={handleInputChange} />
          </div>
        </div>



        <div className={styles.review__places}>
          <div className={styles.places__title}>
            <p>추천 장소</p>
            <button type="button" onClick={handleAddPlace}>+ 장소 추가</button>
          </div>

          {reviewInfo.suggests.map((place, index) => (
            <div key={index}>
              <input type="text" value={place} onChange={(e) => handlePlaceChange(e.target.value, index)} />
              <button type="button" onClick={() => handleRemovePlace(index)}>삭제</button>
            </div>
          ))}

        </div>
        <div className={styles.review__images}>
          <p>이미지 추가하기</p>
          <input />
        </div>
        <div className={styles.review__content}>
          <p>리뷰 내용</p>
          <textarea
                placeholder='메모를 입력해주세요'
                cols="70"
                rows="20"
                name="content"
                onChange={handleInputChange}
                value={reviewInfo.content}
              />
        </div>

        <button className={styles.enroll__btn} type="button" onClick={handleSubmit}>등록하기</button>
      </div>
    </div>
  );
};

export default RegisterReview;
