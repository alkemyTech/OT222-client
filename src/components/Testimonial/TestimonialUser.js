import React, { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';
import axios from 'axios';
import { Flex, Text, Grid, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const TestimonialsUser = () => {
  const [testimonio, setTestimonio] = useState([]);
  const getTestimony = () => {
    axios
      .get(
        process.env.REACT_APP_SERVER_BASE_URL +
          process.env.REACT_APP_TESTIMONIALS_GET
      )
      .then(res => {
        const testimonials = res.data;
        const testimonyIndex = testimonials.length - 12;
        setTestimonio(testimonials.slice(testimonyIndex, testimonials.length));
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getTestimony();
  }, []);

  console.log(testimonio);
  return (
    <Flex
      flexDirection={'column'}
      width={'100%'}
      textAlign={'center'}
      height={{ base: '446vh', sm: '250vh', md: '186vh', lg: '1230px' }}
      align={'center'}
    >
      <Text
        mt={'30px'}
        mb={'30px'}
        fontSize={['36px']}
        fontWeight={'bold'}
        textAlign={'center'}
      >
        Testimonios
      </Text>
      <Grid
        gridTemplateColumns={[
          '1fr ',
          '1fr 1fr',
          '1fr 1fr 1fr ',
          '1fr 1fr 1fr 1fr',
        ]}
        gridGap={'20px'}
        textAlign={'center'}
        justifySelf={'center'}
      >
        {testimonio.map(dato => {
          return <TestimonialCard element={dato} key={dato.id} />;
        })}
      </Grid>
      <Flex
        flexDirection={'column'}
        alignItems={'flex-start'}
        mr={{ base: '4px', sm: '238px', md: '468px', lg: '807px' }}
        mt={'5%'}
      >
        <Link to={'/add-testimony'}>
          <Button
            background={'red'}
            color={'white'}
            fontWeight={'bold'}
            fontSize={['xs', 'xs', 'md', 'md']}
            borderRadius={'15px'}
            boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
          >
            ¡Agregar mi Testimonio!
          </Button>
        </Link>
        <Link to={'/'}>
          <Button
            mt={'20px'}
            background={'white'}
            boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
            borderRadius={'15px'}
          >
            {' '}
            Ir al inicio
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default TestimonialsUser;
