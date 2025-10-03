import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://staging.artemamed.com',
  // baseURL: 'http://127.0.0.1:8000',
  
});



export default axiosInstance;
