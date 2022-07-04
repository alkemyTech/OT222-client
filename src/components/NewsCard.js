import { Button, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Image } from '@chakra-ui/react';
import { Link } from "react-router-dom";
const NewsCard =({element}) =>{
 return(
    <Flex
    flexDirection={"column"}
    alignItems={"center"}
    color={"black"}
    width={[""]}
    mt={"20px"}
    border={"solid black"}
    rounded={"25px"}
    ml={"20px"}
    >

        <Image
          rounded={"21px 21px 0px 0px"}
          textAlign={"center"}
          height={"300px"}
          mb={"15%"}
          src={element.image}
          alt={element.name}
        />
        <Text
         width={"95%"}
         fontSize={"16px"}
         textAlign={"center"}
        >{element.name} </Text>

        
        <Link to={`news/${element.id}`}>
        <Button
        mt={"10%"}
        background={"red"}
        color={"white"}
        mb={"10px"}
        onClick ={()=>{}}
        >ver detalle</Button>
        </Link>

    </Flex>
 )
}

export default NewsCard;