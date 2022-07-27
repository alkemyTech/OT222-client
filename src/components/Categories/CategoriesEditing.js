import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Grid,
  Heading,
  Input,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import AuthorizationService from "../../services/authorization";

const CategoriesEditing = ({ setEditing, _id, data, setCategoriesName }) => {
  const [name, setName] = useState();
  const [description, setDescription] = useState();

  const onEditName = (e) => {
    setName(e.target.value);
  };
  const onEditDescription = (e) => {
    setDescription(e.target.value);
  };
  const onSubmit = () => {
    AuthorizationService.get(
      process.env.REACT_APP_SERVER_BASE_URL + "/auth/me"
    ).then((res) => {
      if (res.data.roleId === 1) {
        try {
          axios.put(
            process.env.REACT_APP_SERVER_BASE_URL + "/categories" + "/" + _id,
            {
              name: name,
              description: description,
            }
          );
          /* const index = data.map((item) => item._id).indexOf(_id);
          setCategoriesName({
            ...data,
          }); */
          window.location.reload();
          setEditing(false);
        } catch (error) {
          console.log("error");
        }
      } else {
        console.log("no permission");
      }
    });
  };
  return (
    <>
      <Flex w="100vw" h="85vh" justifyContent="center">
        <Grid
          w={["90vw", "70vw", "50vw"]}
          h="50vh"
          boxShadow="dark-lg"
          alignSelf="center"
          justifyContent="center"
          autoFlow="row"
          alignContent="space-around"
        >
          <Heading textAlign="center">Editar Categoria</Heading>
          <FormControl>
            <FormLabel fontSize="2xl">Nombre</FormLabel>
            <Input type="text" onChange={onEditName} size="lg" />
            <FormLabel fontSize="2xl">Description</FormLabel>
            <Input
              type="text"
              onChange={onEditDescription}
              size="lg"
              mb="5vh"
            />
            <Flex>
              <Button onClick={() => setEditing(false)}>Volver</Button>
              <Button onClick={onSubmit} colorScheme="green" ml='auto'>
                Actualizar
              </Button>
            </Flex>
          </FormControl>
        </Grid>
      </Flex>
    </>
  );
};

export default CategoriesEditing;
