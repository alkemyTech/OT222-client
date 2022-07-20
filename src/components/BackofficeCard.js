import { Button, Flex } from "@chakra-ui/react";
import React from "react";
import { Image } from '@chakra-ui/react';
import { Link } from "react-router-dom";

const BackofficeCard =({element}) =>{
 return(
    <Flex
    background={"white"}
    flexDirection={"column"}
    rounded={"10px"}
    width={["100%","100%","100%"]}
    height={"230px"}
    boxShadow={"10px 5px 5px grey"}
    mb={"30px"}
    mt={"50px"}
    color={"#FF0000"}
    fontSize={["15px","16px","20px" ]}
    fontWeight={"bold"}
    gap={4}
    alignItems={"center"}
    justifyContent={"space-evenly"}
    >
      <h3>{element.title}</h3>
      <Flex
      width={["6vh","9vh","9vw","10vh"]}
      height={["6vh","9vh","9vh","10vh"]}
      borderRadius={'full'}
      border={"solid black"}
      >
      <Image
          textAlign={"center"}
          width={["6vh","9vh","9vw"]}
          height={["5vh","9vh","9vh"]}
          borderRadius={'full'}
          src={element.img}
          alt={element.alt}
        />

      </Flex>
      <Link to={element.route}>
        <Button
        background={"red"}
        color={"white"}
        width={"150%"}
        height={"100%"}
        alignSelf={"center"}
        >
            ir
        </Button>
      
      </Link>

    </Flex>
 )
}

export default BackofficeCard;