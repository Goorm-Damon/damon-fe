import React, { useEffect, useState } from 'react';
import styles from './MyPage.module.scss';
import { useRecoilState } from 'recoil';
import { userInfostate } from '../../states/user/userInfoState';
import { useNavigate } from 'react-router-dom';
import * as userService from '../../apis/services/userService';
import axios from 'axios';

const MyPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfostate);
  const [nickName, setNickName] = useState(userInfo.data.nickname);
  const [editing, setEditing] = useState(false); // 편집 모드 상태

  // 페이지 이동을 위한 함수
  const navigateTo = (path) => () => {
    navigate(path);
  };

  const handleEdit = () => {
    setEditing(true); // 편집 모드 활성화
  };

  const handleSave = async () => {
    try {
      const response = await userService.updateNickName(nickName);
      setEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  //api 수정해야함
  const handleDeleteUser = async () => {
    try {
      const response = await userService.deleteUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={styles.page}>
        <div className={styles.profile}>
          <div className={styles.profile__img}>
            <img src={userInfo.data.profile} />
          </div>
          <div className={styles.profile__right}>
            {editing ? (
              <input
                className={styles.profile__nickname}
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
              <p onClick={handleSave}>완료</p>
            ) : (
              <p onClick={handleEdit}>편집</p>
            )}
          </div>
        </div>
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
        <p className={styles.delUser} onClick={handleDeleteUser}>회원탈퇴</p>
      </div>
    </div>
  )
}

export default MyPage;
