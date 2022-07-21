import AuthorizationService from "../authorization/index";
import { confirmation, error } from "../alerts";

const RegisterApi = (values, navigate) => {
  const { firstName, lastName, email, password } = values;
  const auth = AuthorizationService.post("auth/register", {
    firstName,
    lastName,
    email,
    password,
  })
    .then(response => {
      confirmation('Has sido registrado, por favor inicia sesión.!!');
      navigate('/');
      return response
    })
    .catch(errorPost => {
      const errorMsg = errorPost.response.data[0].errors[0].email
        ? errorPost.response.data[0].errors[0].email
        : errorPost.response.data[0].errors[0].msg;
      error('Error', errorMsg);
    });
    return auth
};

export default RegisterApi;
