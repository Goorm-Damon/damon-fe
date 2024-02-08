import axios from 'axios';

// Axios 요청 인터셉터 설정
axios.interceptors.request.use(
  config => {
    // 로컬 스토리지에서 토큰 가져오기
    const token = localStorage.getItem('token');
    if (token) {
      // 토큰이 있으면 모든 요청의 헤더에 Authorization 추가
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);