// API
import API from "../../API"
// alerts
import { confirmation, error } from "../alerts"
// Signing up
const RegisterApi = async (values, navigate) => {
  const response = await API.signUp(values)
  if (response.data) {
    confirmation("Has sido registrado, por favor inicia sesión!")
    navigate("/")
    return response
  }
  return error(response)
}
export default RegisterApi
