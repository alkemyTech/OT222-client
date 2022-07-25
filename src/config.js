// URL
const BASE_URL =
  process.env.REACT_APP_SERVER_BASE_URL || "http://localhost:8080"
const SIGN_UP_URL = `auth/register`
const ORGANIZATIONS_PUBLIC_URL = `${BASE_URL}/organizations/public`
const BACKOFFICE_CATEGORIES_URL = `${BASE_URL}/categories`
export { SIGN_UP_URL, ORGANIZATIONS_PUBLIC_URL, BACKOFFICE_CATEGORIES_URL }
