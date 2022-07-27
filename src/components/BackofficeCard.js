import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { Image } from '@chakra-ui/react';
import { Link, useNavigate } from "react-router-dom";

const BackofficeCard = ({ element }) => {

  const navigate = useNavigate();

  return (
    <Flex
      background={"white"}
      flexDirection={"column"}
      borderRadius={"10px"}
      height={"230px"}
      border={"1px solid #e6e6e6"}
      color={"#FF0000"}
      fontSize={["15px", "16px", "20px"]}
      fontWeight={"bold"}
      alignItems={"center"}
      justifyContent={"space-evenly"}
    >
      <h3>{element.title}</h3>
      <Flex
        width={["6vh", "9vh", "9vw", "10vh"]}
        height={["6vh", "9vh", "9vh", "10vh"]}
        borderRadius={'full'}
        border={"solid black"}
      >
        <Image
          textAlign={"center"}
          width={["6vh", "9vh", "9vw"]}
          height={["5vh", "9vh", "9vh"]}
          borderRadius={'full'}
          src={element.img}
          alt={element.alt}
        />

      </Flex>
      <Button
        width={'100px'}
        color={"black"}
        onClick={() => navigate(element.route)}
      >
        IR
      </Button>

    </Flex>
  )
}

export default BackofficeCard;