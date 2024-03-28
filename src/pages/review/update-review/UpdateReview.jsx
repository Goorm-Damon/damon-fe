// // EditReview.js

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import styles from './UpdateReview.module.scss';
// import Select from "react-select";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import * as reviewService from '../../../apis/services/reviewService';
// import { CKEditor } from '@ckeditor/ckeditor5-react';
// import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
// import axios from 'axios';
// // areas 배열과 기타 필요한 컴포넌트/스타일은 RegisterReview.js와 동일하게 가져옵니다.
// const areas = [
//   { value: 'GAPYEONG', label: "가평" },
//   { value: 'GANGWON', label: "강원" },
//   { value: 'GEYONGGI', label: "경기" },
//   { value: 'INCHEON', label: "인천" },
//   { value: 'SEOUL', label: "서울" },
//   { value: 'CHUNGCHEONG', label: "충청" },
//   { value: 'GYEONGSANG', label: "경상" },
//   { value: 'JEOLLLA', label: "전라" },
//   { value: 'JEJU', label: "제주" },
// ];

// const UpadateReview = () => {
//   const { reviewId } = useParams();  // URL로부터 reviewId를 가져옵니다.
//   const navigate = useNavigate();
//   const [reviewData, setReviewData] = useState(null); // 리뷰 데이터 상태 관리
//   const [newImages, setNewImages] = useState([]);  // 추가할 새 이미지 목록
//   const [deletedImageUrls, setDeletedImageUrls] = useState([]);  // 삭제할 이미지 URL 목록
 
//   useEffect(() => {
//     const fetchReviewData = async () => {
//       const response = await reviewService.getDetailReview(reviewId);
//       setReviewData(response.data);
//     };
//     fetchReviewData();
//   }, [reviewId]);

//   const handleAreaChange = (selectedOption) => {
//     setReviewData({ ...reviewData, area: selectedOption ? selectedOption.value : '' });
//   };

//   const handleDateChange = ([start, end]) => {
//     setReviewData({ ...reviewData, startDate: start, endDate: end });
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setReviewData({ ...reviewData, [name]: value });
//   };

//   const handleContentChange = (event, editor) => {
//     const data = editor.getData();
//     setReviewData({ ...reviewData, content: data });
//   };


//   // 추천 장소 추가
// const handleAddPlace = () => {
//   setReviewData(prev => ({
//     ...prev,
//     suggests: [...prev.suggests, '']
//   }));
// };

// // 추천 장소 변경
// const handlePlaceChange = (value, index) => {
//   const updatedSuggests = reviewData.suggests.map((item, idx) => idx === index ? value : item);
//   setReviewData(prev => ({
//     ...prev,
//     suggests: updatedSuggests
//   }));
// };

// // 추천 장소 삭제
// const handleRemovePlace = index => {
//   const filteredSuggests = reviewData.suggests.filter((_, idx) => idx !== index);
//   setReviewData(prev => ({
//     ...prev,
//     suggests: filteredSuggests
//   }));
// };

// // 태그 삭제
// const handleRemoveTag = index => {
//   const filteredTags = reviewData.tags.filter((_, idx) => idx !== index);
//   setReviewData(prev => ({
//     ...prev,
//     tags: filteredTags
//   }));
// };

//   // 리뷰 데이터 변경 시 핸들러
//   const handleChange = (name, value) => {
//     setReviewData({ ...reviewData, [name]: value });
//   };

//   // 새 이미지 추가 함수
//   const handleNewImageChange = (e) => {
//     const files = Array.from(e.target.files);
//     setNewImages(prevImages => [...prevImages, ...files]);
//   };

//   // 이미지 삭제 함수
//   const handleDeleteExistingImage = (imageUrl) => {
//     setDeletedImageUrls(prevUrls => [...prevUrls, imageUrl]);
//   };


//   // 변경사항 저장 및 리뷰 업데이트 로직 구현
//   const handleUpdateReview = async () => {
//     // 이미지 업로드, 리뷰 정보 업데이트 로직 구현
//     try {
//       const formData = new FormData();
//       newImages.forEach(file => {
//         formData.append('images', file);
//       });

//       const uploadResponse = await axios.post('/api/review/upload', formData);
//       const uploadedImageUrls = uploadResponse.data.data;

//       // 수정 데이터 구성
//       const updateData = {
//         ...reviewData,
//         newImages: uploadedImageUrls.map(url => ({ url })),
//         deleteImageUrls: deletedImageUrls,
//       };

//       // 리뷰 수정 요청
//       await reviewService.updateReview(reviewId, updateData);
//       alert('리뷰가 성공적으로 수정되었습니다.');
//       navigate(`/review/${reviewId}`);
//     } catch (error) {
//       console.error('리뷰 수정 중 오류가 발생했습니다.', error);
//       alert('리뷰 수정에 실패했습니다.');
//     }
//   };

//   if (!reviewData) return <div>Loading...</div>;  // 리뷰 데이터 로딩 중 UI

//   // 리뷰 데이터 로드 함수
//   useEffect(() => {
//     const fetchReviewData = async () => {
//       const response = await reviewService.getDetailReview(reviewId);
//       setReviewData(response.data);
//     };
//     fetchReviewData();
//   }, [reviewId]);

//   // UI 렌더링 부분
//   return (
//     <div>
//       <div className={styles.page}>
//         <h1 className={styles.page__title}>리뷰 작성하기</h1>
//         <section className={styles.page__contents}>
//           <div className={styles.review__title}>
//             <p className={styles.category__name}>리뷰 제목<span> *</span></p>
//             <input name="title" type="text" value={reviewInfo.title} onChange={handleInputChange} placeholder="제목을 입력해주세요" className={styles.inputs} />
//           </div>

//           <div className={styles.review__dates}>
//             <p className={styles.category__name}>여행 기간<span> *</span></p>
//             <DatePicker
//               selectsRange={true}
//               startDate={reviewInfo.startDate}
//               endDate={reviewInfo.endDate}
//               onChange={handleDateChange}
//               dateFormat="yyyy/MM/dd"
//               className={styles.inputs}
//             />
//           </div>
//           <div className={styles.area__cost}>
//             <div className={styles.review__area}>
//               <p className={styles.category__name}>지역 카테고리<span> *</span></p>
//               <Select
//                 onChange={handleAreaChange}
//                 options={areas}
//                 placeholder="지역을 선택해주세요"
//                 isClearable
//               />
//             </div>

//             <div className={styles.review__expense}>
//               <p className={styles.category__name}>총 경비</p>
//               <input name="cost" type="text" value={reviewInfo.cost} onChange={handleInputChange} className={styles.inputs} />
//             </div>
//           </div>
//           <div className={styles.review__places}>
//             <div className={styles.places__title}>
//               <p className={styles.category__name}>추천 장소</p>
//               <button type="button" onClick={handleAddPlace}>+ 장소 추가</button>
//             </div>

//             {reviewInfo.suggests.map((place, index) => (
//               <div key={index} className={styles.add_place}>
//                 <input
//                   type="text"
//                   value={place}
//                   onChange={(e) => handlePlaceChange(e.target.value, index)}
//                   placeholder='추천하고 싶은 장소를 입력해주세요'
//                   className={styles.inputs}
//                 />
//                 <div className={styles.minus__btn} type="button" onClick={() => handleRemovePlace(index)}><FaMinus /></div>
//               </div>
//             ))}

//           </div>
//           <div className={styles.review__images}>
//             <p className={styles.category__name}>이미지 추가하기</p>

//             <div className={styles.preview__images}>
//               <label htmlFor="imgs">
//                 <div>
//                   <BsPlusCircleDotted />
//                 </div>
//               </label>
//               <input accept=".png, .svg, .jpeg, .jpg" type="file"
//                 id='imgs'
//                 multiple
//                 onChange={uploadFile}
//               />
//               {
//                 previewImg.map((imgSrc, i) =>
//                   <div key={i}>
//                     {/* <button type="button">
//                   <img alt="업로드 이미지 제거" src="src/assets/icon-close-button.svg" />
//                 </button> */}
//                     <img alt={imgSrc} src={imgSrc} />
//                   </div>
//                 )
//               }
//             </div>

//           </div>
//           <div className={styles.review__content}>
//             <p className={styles.category__name}>리뷰 내용<span> *</span></p>
//             <CKEditor
//               className={styles.editor}
//               editor={ClassicEditor}
//               name="content"
//               onChange={(event, editor) => {
//                 const data = editor.getData();
//                 setReviewInfo(prev => ({ ...prev, content: data }));
//               }}
//             />
//           </div>
//         </section>
//         <div className={styles.tags__container}>
//           {reviewInfo.tags.map((tag, index) => (
//             <div key={index} className={styles.tags}>
//               <p># {tag}</p>
//               <div className={styles.del__btn} onClick={() => handleRemoveTag(index)}><IoCloseOutline /></div>
//             </div>
//           ))}
//           <div className={styles.tags}>
//             <p>#</p>
//             <input
//               className={styles.tag__input}
//               placeholder='태그 입력'
//               onKeyDown={(e) => {
//                 if (e.key === ' ' || e.key === 'Spacebar') {
//                   e.preventDefault(); // 공백 입력 시 기본 이벤트 차단
//                 } else if (e.key === 'Enter') {
//                   const trimmedValue = e.target.value.trim();
//                   if (trimmedValue) {
//                     setReviewInfo(prev => ({
//                       ...prev,
//                       tags: [...prev.tags, trimmedValue],
//                     }));
//                     e.target.value = '';
//                   }
//                   e.preventDefault();
//                 }
//               }}
//             />
//           </div>
//         </div>
//         <button
//           className={styles.enroll__btn}
//           type="button"
//           onClick={handleSubmit}
//           disabled={!reviewInfo.title || !reviewInfo.area || !reviewInfo.startDate || !reviewInfo.endDate || !reviewInfo.content}
//         >
//           등록하기
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UpadateReview
