import React, { useEffect, useState } from 'react';
import styles from './EditReview.module.scss';
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useRecoilState } from 'recoil';
import { reviewInfoState } from '../../../states/review/reviewState';
import { useLocation, useNavigate } from 'react-router-dom';
import * as reviewService from '../../../apis/services/reviewService';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FiMinus } from "react-icons/fi";
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

const EditReview = () => {

  const navigate = useNavigate();
  const review = useLocation().state.review;
  const [postImg, setPostImg] = useState([]);
  const [previewImg, setPreviewImg] = useState(review.imageUrls);
  const [newImageUrls, setNewImageUrls] = useState([]);
  const [reviewInfo, setReviewInfo] = useState({
    title: review.title,
    startDate: new Date(review.startDate),
    endDate: new Date(review.endDate),
    area: review.area,
    cost: review.cost,
    suggests: review.suggests,
    tags: review.tags,
    content: review.content,
    images: review.imageUrls, // 기존 이미지 URL만 사용
    deleteImages: [],
  });

  const handleDeleteImg = (i) => {
    const filteredImg = previewImg.filter((_, idx) => idx !== i);
    const filteredImg２ = postImg.filter((_, idx) => idx !== i);
    const filteredCurrentImg = review.imageUrls.filter((_, idx) => idx !== i);
    setPreviewImg(filteredImg);
    setPostImg(filteredImg２);
    setReviewInfo(prev => ({ ...prev, images: filteredCurrentImg }));

    if (review.imageUrls[i]) {
      setReviewInfo(prev => ({
        ...prev,
        deleteImages: [...prev.deleteImages, review.imageUrls[i]],
      }));
    }
  };

  useEffect(() => {
    console.log(reviewInfo.deleteImages);
  }, [reviewInfo.deleteImages]);

  const uploadFile = async (e) => {
    const files = Array.from(e.target.files);
    setPostImg((prev) => [...prev, ...files]);

    const fileUrls = await Promise.all(files.map(async (file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target.result);
        };
        reader.readAsDataURL(file);
      });
    }));

    setPreviewImg((prev) => [...prev, ...fileUrls]);
  };

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

  const handleSubmit = async () => {
    try {
      // 새로운 이미지 파일이 있는 경우 업로드 처리
      let newImageUrls = [];
      if (postImg.length > 0) {
        const formData = new FormData();
        postImg.forEach((file) => {
          formData.append("images", file);
        });
  
        const uploadResponse = await axios.post('/api/review/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
  
        if (uploadResponse.status === 200) {
          newImageUrls = uploadResponse.data.data;
          console.log('새롭게 업로드된 이미지 URL:', newImageUrls);
        } else {
          console.error('이미지 업로드 응답 오류:', uploadResponse.error);
          return;
        }
      }
  
      const reviewDataWithImage = {
        ...reviewInfo,
        newImageUrls,
        deleteImageUrls: reviewInfo.deleteImages,  // 삭제할 이미지 URL 포함
      };
      console.log('리뷰 업데이트를 위해 전송된 최종 데이터:', reviewDataWithImage);
  
      const updateResponse = await reviewService.editReview(review.id, reviewDataWithImage);  
  
      if (updateResponse.status === 200) {
        alert("리뷰 수정되었습니다.");
        navigate(`/review/${updateResponse.data.data.id}`, { state: { reviewId: updateResponse.data.data.id } });
      } else {
        console.error('리뷰 업데이트 응답 오류:', updateResponse.error);
      }
    } catch (error) {
      console.error('리뷰 업데이트 제출 중 에러:', error);
    }
  };
  
  
  useEffect(() => {
    setPreviewImg(review.imageUrls);
  }, [review.imageUrls]);


  return (
    <div>
      <div className={styles.page}>
        <h1 className={styles.page__title}>리뷰 수정</h1>
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
                value={areas.find(option => option.value === review.area)}
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
                <div className={styles.minus__btn} type="button" onClick={() => handleRemovePlace(index)}><FiMinus /></div>
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
              <input
                accept=".png, .svg, .jpeg, .jpg"
                type="file"
                id="imgs"
                multiple
                onChange={uploadFile}
              />
              {
                previewImg && previewImg.map((imgSrc, i) =>
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
              data={reviewInfo.content}
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
                  e.preventDefault(); // 공백 입력 시 기본 이벤트 차단
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
          수정하기
        </button>
      </div>
    </div>
  );
};
export default EditReview