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
  const [accessTokenFetching, setAccessTokenFetching] = useState(false);

  console.log("KAKAO_CODE:", KAKAO_CODE);
  // `http://localhost:8080/login/oauth2/code/kakao?code=${KAKAO_CODE}`,

  useEffect(() => {
    const kakaoLogin = async () => {
      try {
        const res = await axios({
          method: "GET",
          url: `/login/oauth2/code/kakao?code=${KAKAO_CODE}`,
          headers: {
            "Content-Type": "application/json;charset=utf-8",
            "Access-Control-Allow-Origin": "http://localhost:3000", // Fixed typo
          },
        });
        console.log(res);
        navigate("/");
      } catch (error) {
        console.error('Error during Axios request:', error);
        // Handle error appropriately
      }
    };
    if (KAKAO_CODE) {
      kakaoLogin();
    }
  }, [KAKAO_CODE]);


  return (
    <div>
      Loading...
    </div>
  )
}

export default KakaoRed