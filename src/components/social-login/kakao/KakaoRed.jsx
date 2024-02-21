import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { userInfostate } from '../../../states/user/userInfoState';
import axios from 'axios';

const KakaoRed = () => {

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfostate);
  const PARAMS = new URL(document.location).searchParams;
  const KAKAO_CODE = PARAMS.get("code");

  console.log("KAKAO_CODE:", KAKAO_CODE);

  // 사용자 정보를 가져오는 getUser 함수
  const getUser = async () => {
    try {
      const infoRes = await axios({
        method: "GET",
        url: 'api/user/info',
      });
      // getUser 호출 성공 시, 받은 사용자 정보를 setUserInfo를 사용하여 상태에 저장
      setUserInfo(preUserInfo => ({
        ...preUserInfo,
        ...infoRes.data
      }));
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };
  useEffect(() => {
    const kakaoLogin = async () => {
      if (!KAKAO_CODE) {
        navigate("/");
        return;
      }
      try {
        const res = await axios({
          method: "GET",
          url: `/api/user/login?code=${KAKAO_CODE}`,
        });
        localStorage.setItem('accessToken', res.data);
        setUserInfo(preUserInfo => ({
          ...preUserInfo,
          accessToken: res.data
        }));
        if (localStorage.getItem('accessToken')) {
          await getUser(); // 사용자 정보를 가져오는 함수 호출
          navigate("/");
        }

      } catch (error) {
        console.error('Error during Axios request:', error);
      }
    };
    kakaoLogin();
  }, []);


  return (
    <div>
      Loading...
    </div>
  )
}

export default KakaoRed