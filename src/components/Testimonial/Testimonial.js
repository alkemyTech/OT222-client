import React, { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';
import axios from 'axios';
import { Flex, Text, Grid , Image} from '@chakra-ui/react';

const Testimonial = () => {
  const [testimonio, setTestimonio] = useState([]);

  const getTestimony = () => {
    axios
      .get(process.env.REACT_APP_SERVER_BASE_URL + "/testimonials")
      .then(res => {
        const testimonials = res.data.testimonials;
        setTestimonio(testimonials);
        /* const testimonyIndex = testimonials.length - 12;
        setTestimonio(testimonials.slice(testimonyIndex, testimonials.length)); */
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
      height={'auto'}
      align={'center'}
      mb='5vh'
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