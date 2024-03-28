import React, { useEffect, useState } from 'react';
import styles from './RegisterReview.module.scss';
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState } from 'recoil';
import { reviewInfoState } from '../../../states/review/reviewState';
import { useNavigate } from 'react-router-dom';
import * as reviewService from '../../../apis/services/reviewService';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FaMinus } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { IoCloseOutline } from "react-icons/io5";
import { BsPlusCircleDotted } from "react-icons/bs";
import axios from 'axios';

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
  const [postImg, setPostImg] = useState([]);
  const [previewImg, setPreviewImg] = useState([]);
  const [reviewInfo, setReviewInfo] = useState({
    title: "",
    startDate: null,
    endDate: null,
    area: "",
    cost: '',
    suggests: [],
    tags: [],
    content: "",
    images: ""
  });

  const handleDeleteImg = (i) => {
    const filteredImg = previewImg.filter((_, idx) => idx !== i);
    const filteredImg２ = postImg.filter((_, idx) => idx !== i);

    setPreviewImg(filteredImg);
    setPostImg(filteredImg２);
  };

  function uploadFile(e) {
    const files = Array.from(e.target.files);
    setPostImg(files);
    const fileUrls = [];

    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        fileUrls.push(e.target.result);
        if (fileUrls.length === files.length) {
          setPreviewImg(fileUrls);
        }
      };
      reader.readAsDataURL(file);
    });
  }

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
    const updatedPlaces = [...reviewInfo.suggests];
    updatedPlaces[index] = value;
    setReviewInfo(prev => ({ ...prev, suggests: updatedPlaces }));
  };

  const handleRemovePlace = index => {
    const filteredPlaces = reviewInfo.suggests.filter((_, idx) => idx !== index);
    setReviewInfo(prev => ({ ...prev, suggests: filteredPlaces }));
  };

  const handleRemoveTag = (index) => {
    setReviewInfo(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    if (postImg) {
<<<<<<< HEAD
      postImg.forEach((file) => {

        formData.append(`images`, file);


      });
      axios.post('/api/review/upload', formData, {
=======
      postImg.forEach((file, index) => {
        formData.append(`images`, file);
      });
      axios.post('/api/upload', formData, {
>>>>>>> ad73e6b5a8f95884c5e68c77bac94501506907f7
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((response) => {
<<<<<<< HEAD
          const images = response.data.data;
          const reviewDataWithImage = { ...reviewInfo, images: images };

=======
          // 이미지 업로드 성공 시 처리 // 여러 이미지를 보내야하는 경우 지금처럼 체인 형식으로 진행하면 리뷰가 이미지 만큼 생성되는 오류 발생함.
          console.log("이미지 업로드 성공:", response.data);
  
          setReviewInfo(prev => ({ ...prev, images: response.data }));
  
          // 리뷰 등록 // 비동기 이슈로 다음과 같이 수정
          const reviewDataWithImage = { ...reviewInfo, images: response.data };
>>>>>>> ad73e6b5a8f95884c5e68c77bac94501506907f7
          console.log("리뷰 정보:", reviewDataWithImage);
          return reviewService.createReview(reviewDataWithImage);
        })
        .then((response) => {
          if (response.status === 200) {
            alert("리뷰 등록되었습니다.");
            navigate(`/review/${response.data.data.id}`, { state: { reviewId: response.data.data.id } });
          } else {
            console.error(response.error);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      console.log("이미지 없음");
      try {
        const response = reviewService.createReview(reviewInfo);
        if (response.status === 200) {
          alert("리뷰 등록되었습니다.");
          navigate(`/review/${response.data.data.id}`, { state: { reviewId: response.data.data.id } });
        } else {
          console.error(response.error);
        }
      }
      catch (error) {
        console.error(error);
      }
    }
  };


  return (
    <div>
      <div className={styles.page}>
        <h1 className={styles.page__title}>리뷰 등록</h1>
        <section className={styles.page__contents}>
          <div className={styles.review__title}>
            <p className={styles.category__name}>리뷰 제목<span> *</span></p>
            <input name="title" type="text" value={reviewInfo.title} onChange={handleInputChange} placeholder="제목을 입력해주세요" className={styles.inputs} />
          </div>

          <div className={styles.review__dates}>
            <p className={styles.category__name}>여행 기간<span> *</span></p>
            <DatePicker
              selectsRange={true}
              startDate={reviewInfo.startDate}
              endDate={reviewInfo.endDate}
              onChange={handleDateChange}
              dateFormat="yyyy/MM/dd"
              className={styles.inputs}
            />
          </div>
          <div className={styles.area__cost}>
            <div className={styles.review__area}>
              <p className={styles.category__name}>지역 카테고리<span> *</span></p>
              <Select
                onChange={handleAreaChange}
                options={areas}
                placeholder="지역을 선택해주세요"
                isClearable
              />
            </div>

            <div className={styles.review__expense}>
              <p className={styles.category__name}>총 경비</p>
              <input name="cost" type="text" value={reviewInfo.cost} onChange={handleInputChange} className={styles.inputs} />
            </div>
          </div>
          <div className={styles.review__places}>
            <div className={styles.places__title}>
              <p className={styles.category__name}>추천 장소</p>
              <button type="button" onClick={handleAddPlace}>+ 장소 추가</button>
            </div>
            {reviewInfo.suggests.map((place, index) => (
              <div key={index} className={styles.add_place}>
                <input
                  type="text"
                  value={place}
                  onChange={(e) => handlePlaceChange(e.target.value, index)}
                  placeholder='추천하고 싶은 장소를 입력해주세요'
                  className={styles.inputs}
                />
                <div className={styles.minus__btn} type="button" onClick={() => handleRemovePlace(index)}><FaMinus /></div>
              </div>
            ))}
          </div>
          <div className={styles.review__images}>
            <p className={styles.category__name}>이미지 추가하기</p>
            <div className={styles.preview__images}>
              <label htmlFor="imgs">
                <div>
                  <BsPlusCircleDotted />
                </div>
              </label>
              <input accept=".png, .svg, .jpeg, .jpg" type="file"
                id='imgs'
                multiple
                onChange={uploadFile}
              />
              {
                previewImg.map((imgSrc, i) =>
                  <div key={i} className={styles.img__container}>
                    <div
                      type="button"
                      className={styles.img__del}
                      onClick={() => handleDeleteImg(i)}
                    >
                      <MdOutlineCancel size={20} />
                    </div>
                    <img alt={imgSrc} src={imgSrc} className={styles.imgs} />
                  </div>
                )
              }
            </div>
          </div>
          <div className={styles.review__content}>
            <p className={styles.category__name}>리뷰 내용<span> *</span></p>
            <CKEditor
              className={styles.editor}
              editor={ClassicEditor}
              name="content"
              onChange={(event, editor) => {
                const data = editor.getData();
                setReviewInfo(prev => ({ ...prev, content: data }));
              }}
            />
          </div>
        </section>
        <div className={styles.tags__container}>
          {reviewInfo.tags.map((tag, index) => (
            <div key={index} className={styles.tags}>
              <p># {tag}</p>
              <div className={styles.del__btn} onClick={() => handleRemoveTag(index)}><IoCloseOutline /></div>
            </div>
          ))}
          <div className={styles.tags}>
            <p>#</p>
            <input
              className={styles.tag__input}
              placeholder='태그 입력'
              onKeyDown={(e) => {
                if (e.key === ' ' || e.key === 'Spacebar') {
                  e.preventDefault();
                } else if (e.key === 'Enter') {
                  const trimmedValue = e.target.value.trim();
                  if (trimmedValue) {
                    setReviewInfo(prev => ({
                      ...prev,
                      tags: [...prev.tags, trimmedValue],
                    }));
                    e.target.value = '';
                  }
                  e.preventDefault();
                }
              }}
            />
          </div>
        </div>
        <button
          className={styles.enroll__btn}
          type="button"
          onClick={handleSubmit}
          disabled={!reviewInfo.title || !reviewInfo.area || !reviewInfo.startDate || !reviewInfo.endDate || !reviewInfo.content}
        >
          등록하기
        </button>
      </div>
    </div>
  );
};

export default RegisterReview;
