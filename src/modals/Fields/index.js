import React from "react"
import ModalContainer from "../../components/ModalContainer"
import { Box, Flex, Input } from "@chakra-ui/react"
const Warning = ({ modalField, cancel, pursue, editFields, onChange }) => {
  return (
    <ModalContainer
      modal={modalField}
      headingTitle={`Fill the values you want to edit in the fields below`}
      cancel={cancel}
      cancelText="Cancel"
      pursue={pursue}
      pursueText="Edit"
    >
      <Box>
        {editFields &&
          editFields.map(({ _id, image, name, alt }) => (
            <Flex flexDirection="column" key={_id}>
              {name && (
                <Input name="name" onChange={onChange} placeholder={name} />
              )}
              {alt && (
                <Input name="alt" onChange={onChange} placeholder={alt} />
              )}
              {image && (
                <Input name="image" onChange={onChange} placeholder={image} />
              )}
            </Flex>
          ))}
      </Box>
    </ModalContainer>
  )
}
export default Warning
