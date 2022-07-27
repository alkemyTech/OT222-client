import React from 'react';
import ContactForm from '../components/ContactForm';
import { Flex } from '@chakra-ui/react';
import ButtonHome from '../components/Buttons/ButtonHome';

const ContactPage = () => {
  return (
    <Flex ml={'10%'} mb={'10%'} direction={'column'}>
      <ContactForm />
      <ButtonHome />
    </Flex>
  );
};

export default ContactPage;
