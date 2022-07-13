import AuthorizationService from "../authorization/index";
import { confirmation, error } from "../alerts";
import axios from "axios";

const RegisterApi = (values, navigate) => {
  const { firstName, lastName, email, password } = values;
  const auth = AuthorizationService.post("auth/register", {
    firstName,
    lastName,
    email,
    password,
  })
    .then((response) => {
      confirmation("Te has registrado exitosamente!!");
      window.localStorage.setItem('token', response.data.token)
      navigate("/");
      return response
    })
    .catch((errorPost) => {
      error("Error", errorPost);
      return false
    });
    return auth
};

export default RegisterApi;
