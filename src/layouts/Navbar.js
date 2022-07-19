import { Box, Button, Grid, Text } from "@chakra-ui/react";
import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import NavButton from "../components/NavButton";
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/user/userSlice'
import { useNavigate } from "react-router-dom";

const navItems = [
  { text: "Inicio", path: "/" },
  { text: "Nosotros", path: "/staff" },
  { text: "Novedades", path: "/news" },
  { text: "Testimonios", path: "/testimonials" },
  { text: "Contacto", path: "/contact" },
  { text: "Contribuye", path: "/contribute" }
]

const auth = () => {
  if (localStorage.getItem('token')) {
    navItems.push({ text: "Backoffice", path: "/backoffice" })
  } else {
    console.log("no esta logueado")
  }
}
auth()

const logoutFunc = (dispatch, navigate) => {
  localStorage.removeItem('token')
  dispatch(logout())
  navigate('/')
  document.location.reload()
}


const Navbar = ({ mobile, setMobile }) => {
  const location = useLocation().pathname;
  const dispatch = useDispatch()
  const navigate = useNavigate()

  return (
    <Grid
      autoFlow={mobile === false ? "column" : "row"}
      fontSize={mobile === false ? ["sm", "lg", "lg", "xl", "xl", "2xl"] : "2xl"}
      gap="1vw"
      textAlign={"center"}
      alignItems="center"
      display={
        mobile === false
          ? ["none", "none", "grid", "grid"]
          : ["grid", "grid", "grid", "grid"]
      }
      h={mobile === true ? "60vh" : "auto"}
      ml="auto"
      w='100%'
    >
      {navItems.map((element, key) => {
        return (
          <Box
            fontWeight={location === element.path ? "500" : "none"}
            key={key}
            onClick={mobile === true ? () => setMobile(false) : undefined}
          >
            <NavLink to={element.path}>
              <Text
                fontWeight={location === element.path ? "700" : "400"}
                key={key}
              >
                {element.text}
              </Text>
            </NavLink>
          </Box>
        );
      })}
      <Grid
        autoFlow={"column"}
        ml="auto"
        gap="2vw"
        display={["none", "none", "grid", "grid"]}
      >
        {useSelector(state => state.user.isLogged) ?
          <Button variant="link" onClick={() => logoutFunc(dispatch, navigate)}>Cerrar Sesión</Button>
          :
          <>
            <NavButton name="Log In" path="/login" mobile={false} />
            <NavButton
              name="Registrarse"
              path="/register"
              color="red"
              mobile={false}
            />
          </>}

      </Grid>
    </Grid >
  );
};

export default Navbar;
