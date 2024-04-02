import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import styles from './DropDown.module.scss'
import AlertModal from '../../../modal/alert-modal/AlertModal';
import AddPlace from './../../../sidebars/sidebar2/add-place/AddPlace';
import * as reviewService from '../../../../apis/services/reviewService'
import { reviewInfoState } from '../../../../states/review/reviewState';
import { useRecoilState } from 'recoil';

const DropDown = ({setClick}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewInfo, setReviewInfo] = useRecoilState(reviewInfoState);
  const navigate = useNavigate();

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleEditClick = () => {
    handleEdit();
    setClick(false);
  };

  const handleDeleteClick = () => {
    // 삭제 메뉴 클릭 시 처리 로직 추가
    handleDelete();
    setClick(false);
  };

  
  const handleDelete = async () => {
    try {
      const response = await reviewService.deleteReview(reviewInfo.id);
      if (response.status === 200) {
        console.log("response", response);
        //상세일정 페이지로 이동해야함.
        navigate('/review', { replace: true });
        // 페이지 이동이 확실히 반영된 후 새로고침
      } else {
        console.error(response.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async () => {
    try {
      navigate(`/review/edit/${reviewInfo.id}`, { state: { review: reviewInfo } });
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <>
      <ul className={styles.dropdown__menu}>
        <li className={styles.menu_edit} onClick={handleEditClick}>수정</li>
        <li className={styles.menu_dele} onClick={openModal}>삭제</li>
      </ul>
      {isModalOpen &&
        <AlertModal closeEvent={closeModal} title="리뷰 삭제" actionMsg="삭제" actionEvent={handleDeleteClick}>
          해당 리뷰를 삭제하시겠습니까?
          <br />
          삭제한 리뷰는 복구 할 수 없습니다.
        </AlertModal>
      }

    </>
  );
}

export default DropDown