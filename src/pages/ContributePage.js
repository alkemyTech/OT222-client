import React from 'react';
import ContactForm from '../components/ContactForm';
import { Link } from "react-router-dom"
import { Text, Button, Flex } from '@chakra-ui/react';
const ContributePage = () => {
  return (
    <Flex
    flexDirection={"column"}
    ml={"15%"}
    >
    <Text
    mb={"20px"}
    mt={"20px"}
    fontSize={['36px']}
    fontWeight={'bold'}
    >¿Quieres Contribuir?</Text>
    <Button
    background={"red"}
    width={"20%"}
    color={"white"}
    boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
    >Contribuir</Button>
    <ContactForm />
    <Link to={"/"}>
    <Button
    mt={"10px"}
    mb={"50px"}
    background={"white"}
    border={"1px solid black"}
    boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
    >ir al inicio</Button>
    </Link>
    </Flex>
  )
}

export default ContributePage