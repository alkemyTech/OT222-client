import React, { useState } from "react"
import { Flex, Button, Text, Heading } from "@chakra-ui/react"
import axios from "../../services/authorization/index"
import { confirmation } from "../../services/alerts/index"
import LoaderSpinner from "../LoaderSpinner"

function TestimonyDeleteConfirmation({ testimonio, setDeleting }) {
  const [loading, setLoading] = useState(false)

  const deleteTestimony = () => {
    setLoading(true)
    axios
      .delete("/testimonials/" + testimonio.id)
      .then((res) => {
        setLoading(false)
        setDeleting(null)
        confirmation(testimonio.name, "Ha sido borrado con éxito.")
      })
      .catch((err) => console.log(err))
  }

  if (loading) return <LoaderSpinner></LoaderSpinner>

  return (
    <Flex
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
        ¿Está seguro que desea eliminar el testimonio de {testimonio.name}?
      </Heading>
      <Flex justifyContent={"space-between"}>
        <Button
          onClick={() => {
            setDeleting(null)
          }}
        >
          Cancelar
        </Button>
        <Button colorScheme="red" onClick={() => deleteTestimony()}>
          Eliminar
        </Button>
      </Flex>
    </Flex>
  )
}
export default TestimonyDeleteConfirmation
