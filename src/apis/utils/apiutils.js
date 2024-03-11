import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL

const instance = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
});

instance.interceptors.request.use((config) => {
    if (!config.headers) return config;
    const accessToken = localStorage.getItem('accessToken')

    if (accessToken && config.headers) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
})

//리프레시토큰 요청 api
const postRefreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const response = await axios.post(`/api/user/refresh?refreshToken=${refreshToken}`);
    console.log("refereshToken", response);
    if(response.status === 200) {
        localStorage.setItem("accessToken",response.data.data.accessToken);
        localStorage.setItem("refreshToken",response.data.data.refreshToken);
    }
    return response;
}

//리프레시 토큰 구현
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response?.status === 403) {
            try {
                const tokenResponse = await postRefreshToken();
                if (tokenResponse.status === 200) {
                    error.config.headers = {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    };
                    const response = await axios.request(error.config);
                    return response;
                }
                else {
                    alert(tokenResponse.status);
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
        return Promise.reject(error);
    },
);


function handleResponse(response) {
    const { status, data } = response;

    switch (status) {
        case 200:
            // 성공
            return { success: true, data };
        case 201:
            // 생성됨
            return { success: true, data };
        default:
            // 기타 상태 코드 처리
            return { success: false, error: `Unknown status code: ${status}` };
    }
}

function handleError(error) {
    if (error.response) {
        const { status, data } = error.response;
        switch (status) {
            case 400:
                // 잘못된 요청
                return { success: false, error: 'Bad Request', details: data };
            case 401:
                // 인증 실패
                return { success: false, error: 'Unauthorized', details: data };
            case 403:
                // 접근 금지
                return { success: false, error: 'Forbidden', details: data };
            case 404:
                // 찾을 수 없음
                return { success: false, error: 'Not Found', details: data };
            case 500:
                // 서버 내부 오류
                return { success: false, error: 'Internal Server Error', details: data };
            case 503:
                // 서비스를 사용할 수 없음
                return { success: false, error: 'Service Unavailable', details: data };
            default:
                // 기타 4xx 및 5xx 상태 코드 처리
                return { success: false, error: `Server responded with status code ${status}`, details: data };
        }
    } else if (error.request) {
        // 요청이 전송되었지만 응답을 받지 못했을 때
        return { success: false, error: 'No response from server' };
    } else {
        // 요청을 만들 때 무언가 문제가 발생했을 때
        return { success: false, error: error.message };
    }
}

export default instance;