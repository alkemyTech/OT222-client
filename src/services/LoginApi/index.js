import AuthorizationService from '../authorization/index';

const LoginApi = data => {
  const { email, password } = data;
  AuthorizationService.post('auth/login', { email, password });
};

export default LoginApi;
