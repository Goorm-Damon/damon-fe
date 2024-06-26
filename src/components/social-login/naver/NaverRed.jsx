import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { useRecoilState } from 'recoil';
import { userInfostate } from '../../../states/user/userInfoState';
import axios from 'axios';

const NaverRed = () => {

  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useRecoilState(userInfostate);
  const PARAMS = new URL(document.location).searchParams;
  const NAVER_CODE = PARAMS.get("code");

  console.log("NAVER_CODE:", NAVER_CODE);

  const getUser = async (accessToken) => {
    try {
      // Authorization 헤더에 accessToken 추가
      const infoRes = await axios({
        method: "GET",
        url: 'api/user/info',
        headers: {
          'Authorization': `Bearer ${accessToken}`, // 여기에 토큰을 추가
        },
      });
      const { data } = infoRes.data; // 응답에서 데이터만 추출
      setUserInfo(preUserInfo => ({
        ...preUserInfo,
        data: data
      }));
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  useEffect(() => {
    const naverLogin = async () => {
      if (!NAVER_CODE) {
        navigate("/");
        return;
      }
      try {
        const res = await axios({
          method: "GET",
          url: `/api/user/login/naver?code=${NAVER_CODE}`,
        });
        const { data } = res.data; // 응답에서 데이터만 추출
        localStorage.setItem('accessToken', data.accessToken);
        localStorage.setItem('refreshToken', data.refreshToken);
        setUserInfo(preUserInfo => ({
          ...preUserInfo,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken
        }));
        if (localStorage.getItem('accessToken')) {
          await getUser(data.accessToken); // 사용자 정보를 가져오는 함수 호출
          navigate("/");
        }

      } catch (error) {
        console.error('Error during Axios request:', error);
      }
    };
    naverLogin();
  }, []);


  return (
    <div>
      Loading...
    </div>
  )
}

export default NaverRed