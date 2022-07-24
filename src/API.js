import axios from "axios"
// services
import AuthorizationService from "./services/authorization"
// config
import { SIGN_UP_URL, BACKOFFICE_CATEGORIES_URL } from "./config"
// API
const apiConfig = {
  signUp: async (values) => {
    const { firstName, lastName, email, password } = values
    try {
      const auth = await AuthorizationService.post(SIGN_UP_URL, {
        firstName,
        lastName,
        email,
        password,
      })
      return auth
    } catch (error) {
      const { errors } = error.response.data[0]
      if (errors[0].email) return errors[0].email
      if (errors[0].msg) return errors[0].msg
    }
  },
  getCategories: async () => {
    const { data } = await axios.get(BACKOFFICE_CATEGORIES_URL)
    return data
  },
}
export default apiConfig
