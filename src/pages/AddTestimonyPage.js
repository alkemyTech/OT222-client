import React from 'react';
import TestimonialForm from '../components/Testimonial/TestimonialForm';
import { Flex } from '@chakra-ui/react';

const AddTestimonyPage = () => {
  return (
    <Flex flexDirection={'column'} ml={'5%'} mt={'3%'} mb={'10%'}>
      <TestimonialForm />
    </Flex>
  );
};

export default AddTestimonyPage;
