import {
  Box,
  Button,
  Flex,
  Grid,
  Image,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import MembersTable from "../components/MembersTable/MembersTable";
import axios from "axios";
import MemberThumbnail from "../components/MemberThumbnail";
import StaffMember from "../assets/rodrigofuente.jpg";
import { useNavigate } from "react-router-dom";

const StaffPage = () => {
  const [staff, setStaff] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:4000/members").then((res) => {
      setStaff(res.data);
    });
  }, []);

  const navigate = useNavigate();
  return (
    <>
      <Grid h="auto" justifyContent="center">
        <Text
          fontSize="6xl"
          fontWeight="semibold"
          textAlign="center"
          mt="5vh"
          w="100vw"
        >
          ¡Nuestro staff!
        </Text>
        <Grid
          mt="10vh"
          mb="10vh"
          mr="10vw"
          ml="10vw"
          autoFlow={["row", "row", "row", "column"]}
          gap="5vw"
        >
          <Box w={["90vw", "90vw", "90vw", "50vw"]} h="auto">
            <Text fontSize="5xl" fontWeight="semibold">
              Roberto Martinez
            </Text>
            <Text fontSize="5xl">Rol que desempeña</Text>
            <Text mt="5vh" fontSize="3xl">
              Ullamco nisi Lorem amet excepteur irure commodo eu elit tempor sit
              et. Non velit Lorem Lorem consectetur qui ex occaecat occaecat et
              occaecat quis. Cupidatat tempor eiusmod laboris laborum elit culpa
              adipisicing nulla ut sit qui. Labore veniam cillum do veniam
              nostrud mollit pariatur pariatur. Anim ipsum nostrud consectetur
              quis tempor in nulla do adipisicing culpa esse officia tempor.
              Aliqua eu excepteur commodo irure consectetur deserunt.
            </Text>
            <Button
              w="40%"
              h="5rem"
              mt="5vh"
              colorScheme="red"
              boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
              onClick={() => {
                navigate('/register')
              }}
            >
              <Text fontSize="2xl">¡Quiero ser parte!</Text>
            </Button>
          </Box>
          <Flex w={["80vw", "80vw", "80vw", "30vw"]} h="50vh">
            <Image src={StaffMember} fit="cover" borderRadius={15} />
          </Flex>
        </Grid>
        <SimpleGrid
          mt="10vh"
          ml="10vw"
          mr="10vw"
          minChildWidth="300px"
          justifyContent="center"
          spacing="40px"
          mb="20vh"
        >
          {staff.map((member) => {
            return (
              <>
                <Flex justifyContent="center">
                  <MemberThumbnail member={member} />
                </Flex>
              </>
            );
          })}
        </SimpleGrid>
      </Grid>
    </>
  );
};

export default StaffPage;
