import React from 'react';
// Utils: latest news
import latestNews from '../utils/latestNews';
// Components
import Carousel from '../components/Carousel';

import TestimonialForm from '../components/Testimonial/TestimonialForm';
// Styles
import { Box, Flex, Text } from '@chakra-ui/react';
const HomePage = () => {
  return (
    <Box>
      <Text m="40px" p="20px" fontSize="36px">
        Texto de Bienvenida
      </Text>
      <Carousel />
      {latestNews &&
        latestNews.map(({ _id, title, briefDescription }) => {
          return (
            <Flex key={_id} ml="40px" p="20px" direction="column">
              <Text fontWeight="bold">{title}</Text>
              <Text>{briefDescription}</Text>
            </Flex>
          );
        })}
    </Box>
  );
};
export default HomePage;
