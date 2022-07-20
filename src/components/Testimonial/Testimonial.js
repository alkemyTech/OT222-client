import React, { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';
import axios from 'axios';
import { Flex, Text, Grid,} from '@chakra-ui/react';


const Testimonial = () => {

 const [testimonio, setTestimonio] = useState([])
 const getTestimony = () => {
    axios
      .get(process.env.REACT_APP_SERVER_BASE_URL + '/testimonials')
      .then(res => {
        console.log(res.data);
        setTestimonio(res.data.testimonials);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getTestimony();
  }, []); 

 console.log(testimonio)
  return (
    <Flex
      flexDirection={'column'}
      width={'95%'}
      textAlign={'center'}
      height={['400vh', '200vh']}
      ml={"10px"}
    >
      <Text fontSize={['36px']} fontWeight={'bold'} textAlign={'center'}>
        Testimonios
      </Text>
      <Grid
        gridTemplateColumns={['1fr 1fr', '1fr 1fr', '1fr 1fr 1fr', '1fr 1fr 1fr 1fr 1fr']}
        gridGap={['10px','10px','0px','0px','10px']}
        justifySelf={'center'}
      >
        {testimonio.map(dato => {
          return <TestimonialCard element={dato} key={dato.id} />;
        })}
      </Grid>
    </Flex>
  );
};

export default Testimonial;