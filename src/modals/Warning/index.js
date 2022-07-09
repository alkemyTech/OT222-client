import React from "react"
import ModalContainer from "../../components/ModalContainer"
const Warning = ({ modalWarning, name = "this", cancel, pursue }) => {
  return (
    <ModalContainer
      modal={modalWarning}
      headingTitle={`Are you sure you want to delete ${name}?`}
      cancel={cancel}
      cancelText="Cancel"
      pursue={pursue}
      pursueText="Delete"
    />
  )
}
export default Warning
