import axios from 'axios';
// config

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: 'http://207.180.230.78:8000' });

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;