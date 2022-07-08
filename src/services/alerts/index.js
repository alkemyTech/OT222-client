import Swal from "sweetalert2"
import withReactContent from "sweetalert2-react-content"

const SweetAlert = withReactContent(Swal)

export const confirmation = (title, text) => {
  return SweetAlert.fire({
    icon: "success",
    title,
    text
  })
}
export const error = (title, text) => {
  return SweetAlert.fire({
    icon: "error",
    title,
    text
  })
}
export const information = (title, text) => {
  return SweetAlert.fire({
    icon: "info",
    title,
    text,
  })
}