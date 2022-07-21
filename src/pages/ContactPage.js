import React from 'react';
import ContactForm from '../components/ContactForm';
import {Flex } from '@chakra-ui/react';

const ContactPage = () => {
  return (
    <Flex
    ml={"10%"}
    mb={"10%"}
    >
   <ContactForm /> 
   </Flex>
  )
}

export default ContactPage;
