const BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;
const token = localStorage.getItem('token');
const axios = require('axios');

const AuthorizationService = axios.create({
  baseURL: BASE_URL,
  headers: { Authorization: `Bearer ${token}` },
});

export default AuthorizationService;
