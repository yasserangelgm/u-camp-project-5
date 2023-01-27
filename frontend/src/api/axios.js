import axios from 'axios';

const DEV = true;

const BASE_URL = DEV
  ? process.env.REACT_APP_DEV_BASE_URL
  : process.env.REACT_APP_PROD_BASE_URL;

export default axios.create({
  baseURL: BASE_URL,
});
