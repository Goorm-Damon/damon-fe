import React, { useEffect, useState } from 'react';
import styles from './MyPage.module.scss';
import { useRecoilState } from 'recoil';
import { userInfostate } from '../../states/user/userInfoState';
import { useNavigate } from 'react-router-dom';
import * as userService from '../../apis/services/userService';
import axios from 'axios';
import AlertModal from '../../components/modal/alert-modal/AlertModal';

const MyPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfostate);
  const [nickName, setNickName] = useState('');
  const [editing, setEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  // 페이지 이동을 위한 함수
  const navigateTo = (path) => () => {
    navigate(path);
  };

  const handleEdit = () => {
    setEditing(true); // 편집 모드 활성화
  };

  const handleNickname = async () => {
    try {
      const response = await userService.updateNickName(userInfo.data.identifier, nickName);
      setUserInfo(prevUserInfo => ({
        ...prevUserInfo,
        data: response.data.data
      }));
      setEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await userService.deleteUser(userInfo.data.identifier);
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('recoil-persist');
      setUserInfo({});
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    if (!localStorage.getItem('accessToken')) {
      navigate('/login');
    }
  }, []);

  return (
    <div>
      <div className={styles.page}>
        {userInfo.data &&

          <div className={styles.profile}>
            <div className={styles.profile__img}>
              <img src={userInfo.data.profile} />
            </div>
            <div className={styles.profile__right}>
              {editing ? (
                <input
                  className={styles.profile__nickname__activate}
                  value={nickName}
                  onChange={(e) => setNickName(e.target.value)}
                />
              ) : (
                <input
                  className={styles.profile__nickname}
                  readOnly
                  value={userInfo.data.nickname}
                />
              )}
              {editing ? (
                <p onClick={handleNickname}>완료</p>
              ) : (
                <p onClick={handleEdit}>편집</p>
              )}
            </div>
          </div>
        }
        <section className={styles.my__contents}>
          <div className={styles.menu__container} onClick={navigateTo('/my/review')}>
            <p>내가 쓴 리뷰</p>
          </div>
          <div className={styles.menu__container} onClick={navigateTo('/my/calendar')}>
            <p>내 여행 일정</p>
          </div>
          <div className={styles.menu__container}>
            <p>내가 작성 한 커뮤니티</p>
          </div>
          <div className={styles.menu__container} onClick={navigateTo('/my/like/review')}>
            <p>좋아요 한 게시글</p>
          </div>
        </section>
        <p className={styles.delUser} onClick={openModal}>회원탈퇴</p>
      </div>
      {isModalOpen &&
        <AlertModal closeEvent={closeModal} title="회원탈퇴" actionMsg="탈퇴" actionEvent={handleDeleteUser}>
          회원탈퇴 하시겠습니까?
          <br />
          탈퇴한 계정은 복구할 수 없습니다.
        </AlertModal>
      }
    </div>
  )
}

export default MyPage;
