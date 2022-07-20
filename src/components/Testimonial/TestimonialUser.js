import React, { useState, useEffect } from 'react';
import TestimonialCard from './TestimonialCard';
import axios from 'axios';
import { Flex, Text, Grid, Button } from '@chakra-ui/react';
import { Link } from "react-router-dom"


const TestimonialsUser = () => {
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
    >
      <Text fontSize={['36px']} fontWeight={'bold'} textAlign={'center'}>
        Testimonios
      </Text>
      <Grid
        gridTemplateColumns={['1fr 1fr', '1fr 1fr', '1fr 1fr 1fr 1fr']}
        gridGap={'20px'}
        textAlign={'center'} //alinea los titulos
        justifySelf={'center'}
      >
        {testimonio.map(dato => {
          return <TestimonialCard element={dato} key={dato.id} />;
        })}
      </Grid>
      <Flex
      flexDirection={"column"}
      alignItems={"flex-start"}
      ml={"5%"}
      mt={"5%"}
      >
      <Link 
      to={"/add-testimony"}>
      <Button
      background={"red"}
      color={"white"}
      fontWeight={"bold"}
      borderRadius={"15px"}
      boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"} 
      >¡Agregar mi testimonio!</Button>
      </Link>
      <Link to={"/"}>
      <Button
      mt={"20px"}
      background={"white"}
      boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
      borderRadius={"15px"}
      > ir al inicio</Button>
      </Link>

      </Flex>
    </Flex>
  );
};

export default TestimonialsUser;