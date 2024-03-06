import axios from 'axios';
import apiutils from "../utils/apiutils";

//리프레시토큰 요청 api
function postRefreshToken() {
  const response = apiutils.post('/api/user/refresh', {
  });
  return response;
}

//리프레시 토큰 구현
apiutils.call.interceptors.response.use(
  (response) => {
      return response;
  },
  async (error) => {
      const {
          config,
          response: { status },
      } = error;

      if (status === 403) {
          if (error.response.data.message === 'Forbidden') {
              const originRequest = config;
              try {
                  const tokenResponse = await postRefreshToken();
                  if (tokenResponse.status === 201) {
                      const newAccessToken = tokenResponse.data.token;
                      localStorage.setItem('accessToken', tokenResponse.data.token);
                      localStorage.setItem(
                          'refreshToken',
                          tokenResponse.data.refreshToken,
                      );
                      axios.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;
                      originRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                      return axios(originRequest);
                  }
              } catch (error) {
                  if (axios.isAxiosError(error)) {
                      if (
                          error.response?.status === 404 ||
                          error.response?.status === 422
                      ) {
                          alert(error.response);
                          window.location.replace('/login');
                      } else {
                          alert(error.response);
                      }
                  }
              }
          }
      }
      return Promise.reject(error);
  },
);