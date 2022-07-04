import AuthorizationService from '../authorization/index';

const RegisterApi = data => {
  const { name, lastName, email, password } = data;
  AuthorizationService.post('auth/register', {
    name,
    lastName,
    email,
    password,
  });
};

export default RegisterApi;
