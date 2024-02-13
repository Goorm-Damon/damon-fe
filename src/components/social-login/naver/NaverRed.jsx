// import React, { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom';
// import { useRecoilState } from 'recoil';
// import { userInfostate } from '../../../states/user/userInfoState';

// const NaverRed = () => {
//   const navigate = useNavigate();
//   const [userInfo, setUserInfo] = useRecoilState(userInfostate);
//   const PARAMS = new URL(document.location).searchParams;
//   const accessToken = PARAMS.get("token");
//   const [accessTokenFetching, setAccessTokenFetching] = useState(false);

//   const fetchAuth = async () => {
//     if (accessTokenFetching) return; // Return early if fetching

//     if (accessToken) {
//       try {
//         setAccessTokenFetching(true); // Set fetching to true
  
//         setUserInfo({
//           ...userInfo,
//           accessToken: accessToken,
//         });
//         localStorage.setItem('accessToken', accessToken);
//         console.log(userInfo);
  
//         setAccessTokenFetching(false); // Reset fetching to false
//         navigate("/main");
//       } catch (error) {
//         console.error("Error:", error);
//         setAccessTokenFetching(false); // Reset fetching even in case of error
//       }
//     } else {
//       navigate('/main');
//     }
    
//   };

//   useEffect(() => {
//     if (!userInfo.accessToken) {
//       fetchAuth();
//     }
//   }, []);
//   return (
//     <div>
//       loding...
//     </div>
//   )
// }

// export default NaverRed