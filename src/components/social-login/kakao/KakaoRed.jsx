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
        if(localStorage.getItem('accessToken')) {
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