import React from 'react';
import ContactForm from '../components/ContactForm';
import { Link } from 'react-router-dom';
import { Text, Button, Flex } from '@chakra-ui/react';
import ButtonHome from '../components/Buttons/ButtonHome';
const ContributePage = () => {
  return (
    <Flex
      flexDirection={'column'}
      ml={'15%'}
      mt="40px"
      mb="30px"
      width={['80%', '70%', '60%', '60%']}
    >
      <Text
        mb={'20px'}
        mt={'20px'}
        fontSize={['18px', '18px', '20px', '25px']}
        fontWeight={'bold'}
      >
        ¿Quieres Contribuir?
      </Text>
      <Button
        background={'red'}
        width={['40%', '25%', '20%', '15%']}
        color={'white'}
        boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
        borderRadius={'15px'}
      >
        Contribuir
      </Button>

      <ContactForm />
      <ButtonHome />
    </Flex>
  );
};

export default ContributePage;
