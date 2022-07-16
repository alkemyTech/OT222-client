import React from 'react';
import LoginForm from '../components/Login/LoginForm';
import { Image, Flex, Grid, useMediaQuery } from '@chakra-ui/react';
import hands from '../assets/hands.png';

const LoginPage = () => {
  const [isMobile] = useMediaQuery('(min-width: 912px)');

  return (
    <Grid
      templateColumns={isMobile ? '1fr 1fr' : '100%'}
      margin={isMobile ? 'none' : '1rem'}
    >
      <Flex justifyContent="center" alignItems="center">
        <LoginForm />
      </Flex>
      <Image
        src={hands}
        height="85vh"
        width="100%"
        objectFit="cover"
        display={isMobile ? 'block' : 'none'}
      />
    </Grid>
  );
};

export default LoginPage;
