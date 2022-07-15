import AuthorizationService from '../authorization/index';
import { confirmation, error } from '../alerts';

const RegisterApi = (values, navigate) => {
  const { firstName, lastName, email, password } = values;
  AuthorizationService.post('auth/register', {
    firstName,
    lastName,
    email,
    password,
  })
    .then(response => {
      confirmation('Te has registrado exitosamente!!');
      navigate('/login');
    })
    .catch(errorPost => {
      error('Error', errorPost.response.data[0].errors[0].email);
    });
};

export default RegisterApi;
