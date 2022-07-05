const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
const axios = require('axios');
const token = JSON.parse(localStorage.getItem('token'));

const AuthorizationService = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${token}` },
});

export default AuthorizationService;
