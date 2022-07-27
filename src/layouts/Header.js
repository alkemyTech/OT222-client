import React, { useEffect, useState } from "react";
import { Box, Flex, Grid, Icon, Image, Button } from "@chakra-ui/react";
import Navbar from "./Navbar";
import NavButton from "../components/NavButton";
import axios from "axios";
import logoIcon from "../public/LOGO-SOMOS-MAS.png";
import { CgMenu } from "react-icons/cg";
import { AiOutlineClose } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { logout } from '../features/user/userSlice'

const Header = () => {
  const [mobile, setMobile] = useState(false);
  const [publicAssets, setPublic] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const logoutFunc = (dispatch, navigate) => {
    localStorage.removeItem('token');
    dispatch(logout());
    navigate('/');
    document.location.reload();
  };

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
        bg='#fff'
        boxShadow={"rgba(0, 0, 0, 0.35) 0px 5px 15px"}
        zIndex='2'
      >
        <Image src={publicAssets.img} />
        <Navbar mobile={false} setMobile={setMobile}/>

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
        position="fixed"
        w="100vw"
        h="100vh"
        bg="#fff"
        justifyContent={"center"}
        pb="4vh"
        zIndex={'1'}
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
          {useSelector(state => state.user.isLogged) ? (
            <Button variant="link" onClick={() => logoutFunc(dispatch, navigate)}>
              Cerrar Sesión
            </Button>
          ) : (
            <>
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
            </>
          )}
        </Grid>
      </Grid>
      <Box h="15vh" />
    </>
  );
};

export default Header;
