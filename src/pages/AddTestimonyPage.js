import React from 'react';
import TestimonialForm from '../components/Testimonial/TestimonialForm';
import {Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom"

const AddTestimonyPage = () => {
  return (
    <Flex
    flexDirection={"column"}
    ml={'5%'}
    mt={'3%'}
    mb={"10%"}
    >

      <TestimonialForm />
      <Link to={"/testimonials"}>
      <Button
      background={"red"}
      color={"white"}
      boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
      borderRadius={"15px"}
      mb={"20px"}
      > volver a Testimonios</Button>
      </Link>
      <Link to={"/"}>
      <Button
      background={"white"}
      boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
      borderRadius={"15px"}
      > ir al inicio</Button>
      </Link>
    </Flex>
  );
};

export default AddTestimonyPage;