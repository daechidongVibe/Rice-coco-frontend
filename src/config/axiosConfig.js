import axios from 'axios';
import getEnvVars from '../../environment';

const { REACT_NATIVE_ANDROID_SERVER_URL } = getEnvVars();

// axios instance 생성
const axiosInstance = axios.create({
    // baseURL 설정
    baseURL: REACT_NATIVE_ANDROID_SERVER_URL
});

// 토큰 적재
axiosInstance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default axiosInstance;
