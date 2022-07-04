import SweetAlert from "sweetalert2-react"
export const confirmation = () => {
  return SweetAlert.fire({
    position: "top-end",
    icon: "success",
    title: "OK",
    showConfirmButton: false,
    timer: 1500,
  })
}
export const error = (errorTitle, errorText) => {
  return SweetAlert.fire({
    icon: "error",
    title: errorTitle,
    text: errorText,
  })
}
export const information = (infoTitle, infoText) => {
  return SweetAlert.fire({
    title: infoTitle,
    text: infoText,
    imageUrl: undefined,
    imageWidth: 400,
    imageHeight: 200,
    imageAlt: undefined,
  })
}
