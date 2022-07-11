import React, { useEffect, useRef } from "react"
import { Flex, Button, Heading, Box } from "@chakra-ui/react"
const ModalContainer = ({
  modal,
  headingTitle,
  cancel,
  cancelText,
  pursue,
  pursueText,
  children,
}) => {
  const closeOutside = useRef()
  useEffect(() => {
    const handler = (e) => {
      if (modal && !closeOutside.current.contains(e.target)) {
        cancel()
      }
    }
    document.addEventListener("mousedown", handler)
    return () => {
      document.removeEventListener("mousedown", handler)
    }
  })
  return (
    <>
      {modal && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          border="1px solid #ccc"
          borderRadius="5px"
          p={5}
          bg="rgba(255,255,255,0.75)"
          boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
          zIndex={10}
          width="100%"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Flex
            ref={closeOutside}
            flexDirection={"column"}
            gap={"20px"}
            width={"520px"}
            maxWidth={"90%"}
            mt={"3%"}
            mb={"10%"}
            boxShadow="dark-lg"
            rounded="ms"
            bg="white"
            p={"2rem"}
          >
            <Heading as="h2" size="lg" mb={"1rem"}>
              {headingTitle}
            </Heading>
            {children}
            <Flex justifyContent={"space-between"}>
              <Button
                onClick={() => {
                  cancel(null)
                }}
              >
                {cancelText}
              </Button>
              <Button colorScheme="red" onClick={() => pursue()}>
                {pursueText}
              </Button>
            </Flex>
          </Flex>
        </Box>
      )}
    </>
  )
}
export default ModalContainer
