import axios from 'axios';

const DEV = false;

const BASE_URL = DEV
  ? process.env.REACT_APP_DEV_BASE_URL
  : 'https://e-commerce-51af.onrender.com/api';

export default axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
  },
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': true,
  },
});
