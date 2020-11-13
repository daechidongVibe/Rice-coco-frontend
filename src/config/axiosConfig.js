import axios from 'axios';
import getEnvVars from '../../environment';

const { REACT_NATIVE_ANDROID_SERVER_URL } = getEnvVars();
// 우리만의 axios instance 생성
const axiosInstance = axios.create({
// baseUrl 설정된 인스턴스 설정
  baseURL: REACT_NATIVE_ANDROID_SERVER_URL
});
// 기본적으로 우리 토큰 넣어줘서 보내줌
axiosInstance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

export default axiosInstance;