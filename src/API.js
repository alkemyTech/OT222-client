import axios from "axios"
// config
import { BACKOFFICE_CATEGORIES_URL } from "./config"
// API
const apiConfig = {
  getCategories: async () => {
    const { data } = await axios.get(BACKOFFICE_CATEGORIES_URL)
    return data
  },
}
export default apiConfig
