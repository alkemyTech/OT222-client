import React, { useEffect, useState } from "react";
import {
  Grid,
  Flex,
  Input,
  Text,
  Button,
  FormLabel,
  Box,
  useTheme,
} from "@chakra-ui/react";
const ProfilePage = () => {

  const user = {
    firstName: "firstname",
    lastName: "lastname",
    email: "user@gmail.com",
  };
  const [edit, setEdit] = useState(true);
  const theme = useTheme();
  return (
    <>
      <Grid
        w="100vw"
        justifyContent={"center"}
        alignContent="center"
        h={"85vh"}
      >
        <Grid
          w={["100vw", "70vw", "60vw","40vw"]}
          bg="#f7f7f7"
          mt="auto"
          mb="auto"
          gap="3vh"
          pb="5vh"
          
        >
          <Text justifySelf="center" fontSize={"4xl"}>
            {" "}
            Mis datos
          </Text>

          <Box w={["50vw", "30vw", "20vw"]} ml="5vw">
            <FormLabel>Nombre</FormLabel>
            <Input
              bg="#fff"
              id="text"
              placeholder={user.firstName}
              isDisabled={edit}
            />
          </Box>
          <Box w={["50vw", "30vw", "20vw"]} ml="5vw">
            <FormLabel>Apellido</FormLabel>
            <Input
              bg="#fff"
              id="text"
              placeholder={user.lastName}
              isDisabled={edit}
            />
          </Box>
          <Box w={["50vw", "30vw", "20vw"]} ml="5vw">
            <FormLabel>Correo</FormLabel>
            <Input
              bg="#fff"
              id="text"
              placeholder={user.email}
              isDisabled={edit}
            />
          </Box>

          <Button
            onClick={() => setEdit(!edit)}
            w={["40vw", "20vw"]}
            bg={theme.colors.secondary}
            ml="5vw"
          >
            Modificar datos
          </Button>
          <Button
            //onClick={} save changes
            w={["40vw", "20vw"]}
            bg={theme.colors.tertiary}
            ml="5vw"
          >
            Guardar cambios
          </Button>
          <Button
            //onClick={} delete account
            w={["40vw", "20vw"]}
            bg={theme.colors.primary}
            ml="5vw"
          >
            Eliminar cuenta
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfilePage;
