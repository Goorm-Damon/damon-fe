import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL

async function call(apiUrl, method, requestData = {}) {
    try {
        const response = await axios({
            url: apiUrl,
            method,
            headers: { 'Authorization': localStorage.getItem('refreshToken') },
            ...requestData
        });
        return handleResponse(response);
    } catch (error) {
        return Promise.reject(handleError(error));
    }
}

//리프레시토큰 요청 api
function postRefreshToken() {
    const response = create('/api/user/refresh',localStorage.getItem('accessToken'));
    return response;
}

//리프레시 토큰 구현
axios.interceptors.response.use(
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
                    if (tokenResponse.status === 200) {
                        const newAccessToken = tokenResponse.data.token;
                        localStorage.setItem('accessToken', tokenResponse.data.token);
                        localStorage.setItem(
                            'refreshToken',
                            tokenResponse.data.refreshToken,
                        );
                        console.log("newAccessToken",newAccessToken);
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

async function create(apiUrl, data) {
    return call(apiUrl, 'POST', { data });
}

async function read(apiUrl) {
    return call(apiUrl, 'GET');
}

async function update(apiUrl, data) {
    return call(apiUrl, 'PUT', { data });
}

async function del(apiUrl) {
    return call(apiUrl, 'DELETE');
}

async function patch(apiUrl) {
    return call(apiUrl, 'PATCH');
}

async function selectDel(apiUrl, data) {
    return call(apiUrl, 'DELETE', { data });
}




export default { call, handleResponse, handleError, create, read, update, del, selectDel, patch };