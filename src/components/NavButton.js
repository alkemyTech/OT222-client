import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NavButton = ({ name, path, color, mobile, setMobile }) => {
  const navigate = useNavigate();

  const onClick = () => {
    if(mobile) setMobile(false)
    navigate(path);
  };

  return (
    <Flex
      fontSize="xl"
      textAlign="center"
      borderRadius="100px"
      alignSelf={"center"}
      justifySelf="center"
      outline={color === "red" ? "none" : "1px solid black"}
      bg={color}
      color={color === "red" ? "#fff" : "#000"}
      onClick={onClick}
      cursor="pointer"
      px={['4vw', '4vw', '2vw', '2vw']}
      py="2vh"
      display={'flex'}

    >
      <Text alignSelf={"center"}>{name}</Text>
    </Flex>
  );
};

export default NavButton;
