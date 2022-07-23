import React, { useState } from "react"
import { Flex, Button, Text, Heading, Box } from "@chakra-ui/react"
import axios from "../../services/authorization/index"
import { confirmation } from "../../services/alerts/index"
import LoaderSpinner from "../LoaderSpinner"

function MemberDeleteConfirmation({ member, setDeleting }) {
  const [loading, setLoading] = useState(false)
  console.log(member)
  const deleteMember = () => {
    setLoading(true)
    axios
      .delete("/members/" + member.id)
      .then((res) => {
        setLoading(false)
        setDeleting(null)
        confirmation(member.name, "Ha sido borrado con éxito.")
      })
      .catch((err) => console.log(err))
  }

  if (loading) return <LoaderSpinner></LoaderSpinner>

  return (
    <Box
      display='flex'
      justifyContent={'center'}
      w='100vw'
      h='100vh'
    >
      <Flex
      alignSelf='center'
      flexDirection={"column"}
      gap={"20px"}
      width={"520px"}
      maxWidth={"90%"}
      mt={"3%"}
      mb={"10%"}
      h='20%'
      boxShadow="dark-lg"
      rounded="ms"
      bg="white"
      p={"2rem"}
    >
      <Heading as="h2" size="lg" mb={"1rem"}>
        ¿Está seguro que desea eliminar el miembro {member.name}?
      </Heading>
      <Flex justifyContent={"space-between"}>
        <Button
          onClick={() => {
            setDeleting(null)
          }}
        >
          Cancelar
        </Button>
        <Button colorScheme="red" onClick={() => deleteMember()}>
          Eliminar
        </Button>
      </Flex>
    </Flex>
    </Box>
  )
}
export default MemberDeleteConfirmation