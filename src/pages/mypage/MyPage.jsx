import React, { useEffect } from 'react';
import styles from './MyPage.module.scss';
import { useRecoilState } from 'recoil';
import { userInfostate } from '../../states/user/userInfoState';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MyPage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfostate);

  // 페이지 이동을 위한 함수
  const navigateTo = (path) => () => {
    navigate(path);
  };

  const getUser = async () => {
    try {
      // Authorization 헤더에 accessToken 추가
      const infoRes = await axios({
        method: "GET",
        url: 'api/user/info',
        headers: {
          'Authorization': `Bearer ${userInfo.accessToken}`, // 여기에 토큰을 추가
        },
      });
      setUserInfo(preUserInfo => ({
        ...preUserInfo,
        data: infoRes.data.data
      }));
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  return (
    <div>
      <div className={styles.page}>
        {/* <section className={styles.profile__top}> */}
        <div className={styles.profile}>
          <div className={styles.profile__img}>
            <img src={userInfo.data.profile} />
          </div>
          <div className={styles.profile__right}>
            <input
              className={styles.profile__nickname}
              readOnly
              value={userInfo.data.nickname} />
            {/* <p>편집</p> */}
          </div>
        </div>
        {/* </section> */}
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
      </div>
    </div>
  )
}

export default MyPage