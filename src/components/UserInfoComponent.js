import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserInfoComponent = ({ serverToken }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUserInfo = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/kakao/info', {
        headers: {
          Authorization: serverToken
        }
      });
      setUserInfo(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error:', error);
      setLoading(false);
    }
  };

  const handleClick = () => {
    fetchUserInfo();
  };

  return (
    <div>
      <button onClick={handleClick}>Get User Info</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        userInfo && (
          <div>
            <p>ID: {userInfo.id}</p>
            <p>Nickname: {userInfo.nickname}</p>
            <img src={userInfo.profile} alt="Profile" />
          </div>
        )
      )}
    </div>
  );
};

export default UserInfoComponent;