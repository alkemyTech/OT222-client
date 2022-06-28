import React, { useEffect, useState } from "react";
import { Box, Flex, Grid, Icon, Image } from "@chakra-ui/react";
import Navbar from "./Navbar";
import NavButton from "../components/NavButton";
import axios from "axios";
import logoIcon from "../public/LOGO-SOMOS-MAS.png";
import { CgMenu } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
const Header = () => {
  const [mobile, setMobile] = useState(false);
  const [publicAssets, setPublic] = useState({});

  // try get logo from endpoint
  const getLogo = async () => {
    await axios
      .get("/organizations/1/public")
      .then((results) => {
        setPublic(results.data)
      })
      .catch(() => {
        setPublic({
          img: logoIcon
        })
      });
  };

  useEffect(() => {
    getLogo();
  }, []);

  return (
    <>
      {/* Desktop Version  */}
      <Grid
        height="15vh"
        width="100vw"
        position={"fixed"}
        autoFlow={"column"}
        alignContent={"center"}
        px="2vw"
        boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
        backgroundColor={"#fff"}
      >
        <Image src={publicAssets.img} />
        <Navbar mobile={false} />

        <Icon
          as={CgMenu}
          fontSize="4xl"
          alignSelf="center"
          display={["flex", "flex", "none", "none"]}
          ml="auto"
          onClick={() => setMobile(!mobile)}
        />
      </Grid>

      {/* Mobile Version */}
      <Grid
        left={mobile === false ? "-100vw" : "0"}
        transition="all 0.4s ease"
        position="absolute"
        w="100vw"
        h="auto"
        bg="#fff"
        justifyContent={"center"}
        pb="4vh"
      >
        <Flex w="100vw" justifyContent={"center"} px="2vw">
          <Image
            src={publicAssets.img}
            w="150px"
            h="150px"
            mx="auto"
            justifySelf={"center"}
          />
          <Icon
            as={AiOutlineClose}
            fontSize="4xl"
            alignSelf="center"
            display={["flex", "flex", "none", "none"]}
            onClick={() => setMobile(!mobile)}
            justifySelf="flex-end"
          />
        </Flex>
        <Navbar setMobile={setMobile} mobile={mobile} />
        <Grid gap="6vh">
          <NavButton
            name="Log In"
            path="/login"
            mobile={false}
            setMobile={setMobile}
          />
          <NavButton
            name="Registrarse"
            path="/register"
            color="red"
            mobile={false}
            setMobile={setMobile}
          />
        </Grid>
      </Grid>
      <Box h="15vh" />
    </>
  );
};

export default Header;
