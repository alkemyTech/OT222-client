import React, { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';
import axios from 'axios';
import { Flex, Text, Grid } from '@chakra-ui/react';

const Testimonial = () => {
  const [testimonio, setTestimonio] = useState([]);
  const getTestimony = () => {
    axios
      .get(process.env.REACT_APP_SERVER_BASE_URL + '/testimonials')
      .then(res => {
        setTestimonio(res.data.testimonials);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getTestimony();
  }, []);

  return (
    <Flex
      flexDirection={'column'}
      width={'100%'}
      textAlign={'center'}
      height={{ base: '425vh', sm: '235vh', md: '165vh', lg: '1022px' }}
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
        justifySelf={'center'}
        textAlign={'center'}
      >
        {testimonio.map(dato => {
          return <TestimonialCard element={dato} key={dato.id} />;
        })}
      </Grid>
    </Flex>
  );
};

export default Testimonial;
