import { Box, Grid, Text } from "@chakra-ui/react";
import React from "react";
import { useLocation, NavLink } from "react-router-dom";
import NavButton from "../components/NavButton";

const navItems = {
  Inicio: "/",
  Nosotros: "/staff",
  Novedades: "/news",
  Testimonios: "/testimonials",
  Contribuye: "/contribute",
};

const Navbar = ({ mobile, setMobile }) => {
  const location = useLocation().pathname;

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
      {Object.entries(navItems).map((item, key) => {
        const name = item[0];
        const path = item[1];
        return (
          <Box
            fontWeight={location === path ? "500" : "none"}
            key={key}
            onClick={mobile === true ? () => setMobile(false) : undefined}
          >
            <NavLink to={path}>
              <Text
                fontWeight={"600"}
                color={location === path ? "red" : "#202020"}
                style={{ textDecoration: "none" }}
                key={key}
              >
                {name}
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
        <NavButton name="Log In" path="/login" mobile={false} />
        <NavButton
          name="Registrarse"
          path="/register"
          color="red"
          mobile={false}
        />
      </Grid>
    </Grid>
  );
};

export default Navbar;
