import AuthorizationService from '../authorization/index';
import { confirmation, error } from '../alerts';

const LoginApi = (values, navigate) => {
  const { email, password } = values;
  AuthorizationService.post('auth/login', { email, password })
    .then(response => {
      confirmation('Has ingresado con exito!!');
      navigate('/');
    })
    .catch(errorPost => {
      error('Error', errorPost);
    });
};

export default LoginApi;
