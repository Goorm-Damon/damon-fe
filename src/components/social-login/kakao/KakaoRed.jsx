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

  // Access Token 받아오기
  const getAccessToken = async () => {
    if (accessTokenFetching) return; // Return early if fetching

    console.log("getAccessToken 호출");

    try {
      setAccessTokenFetching(true); // Set fetching to true
      const response = await axios.post(
        // "http://13.124.113.56/api/auth/kakao",
        `http://localhost:8080/login/oauth2/code/kakao?${KAKAO_CODE}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const accessToken = response.data.accessToken;
      console.log("accessToken:", accessToken);

      setUserInfo({
        ...userInfo,
        accessToken: accessToken,
      });

      setAccessTokenFetching(false); // Reset fetching to false
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
      setAccessTokenFetching(false); // Reset fetching even in case of error
    }
  };


  useEffect(() => {
    if (KAKAO_CODE && !userInfo.accessToken) {
      getAccessToken();
    }
  }, [KAKAO_CODE, userInfo]);

  return (
    <div>
      Loading...
    </div>
  )
}

export default KakaoRed