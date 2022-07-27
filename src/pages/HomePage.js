import React, { useState, useEffect } from 'react';

import Carousel from '../components/Carousel';
import hands from '../assets/hands.png';
import {
  Box,
  Flex,
  Grid,
  Image,
  Text,
  Icon,
  SimpleGrid,
} from '@chakra-ui/react';
import axios from 'axios';
import StaffThumbnail from '../components/StaffThumbnail';
import TestimonialCard from '../components/Testimonial/TestimonialCard';
import NewsCard from '../components/NewsCard';
import VerTodos from '../components/VerTodos';
import { useNavigate } from 'react-router-dom';
const HomePage = () => {
  const [staff, setStaff] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [news, setNews] = useState([]);
  useEffect(() => {
    const getStaffData = async () => {
      await axios
        .get(`${process.env.REACT_APP_SERVER_BASE_URL}/members`)
        .then(res => {
          setStaff(res.data.slice(0, 5));
        });
    };
    const getTestimonialData = async () => {
      await axios
        .get(`${process.env.REACT_APP_SERVER_BASE_URL}/testimonials`)
        .then(res => {
          setTestimonials(res.data.slice(0, 5));
        });
    };

    const getNewsData = async () => {
      await axios
        .get(`${process.env.REACT_APP_SERVER_BASE_URL}/news`)
        .then(res => setNews(res.data.slice(0, 3)));
    };

    getStaffData();
    getTestimonialData();
    getNewsData();
  }, []);

  const navigate = useNavigate()

  return (
    <Grid ml="5vw" mr="5vw" mt="5vh" mb="5vh" gap="15vh">
      {/* <Carousel /> */}
      <Grid autoFlow={['row', 'row', 'row', 'column', 'column']} w="90vw">
        <Box
          w={['90vw', '90vw', '90vw', '35vw', '35vw']}
          h="auto"
          mr="15vw"
          mt="15vh"
        >
          <Text fontSize={['4xl', '5xl']} fontWeight="bold">
            ¡Hola! Bienvenidxs.
          </Text>
          <Text fontSize="2xl" mt="5vh">
            Consequat ad cupidatat anim veniam laborum enim cupidatat consequat.
            Voluptate aute deserunt incididunt duis ullamco anim. Aute commodo
            incididunt ea laborum proident. Irure pariatur Lorem non cillum
            amet. Eiusmod sunt irure occaecat cillum dolor cillum aliqua quis
            incididunt consequat consectetur ex eu reprehenderit. Non ipsum
            deserunt veniam adipisicing quis. Amet ex do eiusmod do fugiat ex
            nisi ad officia voluptate cillum commodo.
          </Text>
          <Flex
            w={['90vw', '30vw', '30vw', '15vw']}
            h="5rem"
            bg="red"
            justifyContent="center"
            borderRadius="30px"
            mt="5vh"
            onClick={() => {
              navigate('/contact')
            }}
            cursor='pointer'
          >
            <Text
              fontSize="2xl"
              alignSelf="center"
              color="#dedede"
              fontWeight="bold"
            >
              Contactanos
            </Text>
          </Flex>
        </Box>
        <Flex
          w={['90vw', '90vw', '90vw', '40vw', '40vw']}
          h={'80vh'}
          justifyContent="center"
          alignSelf="center"
          display={['none', 'none', 'none', 'flex', 'flex']}
        >
          <Image
            src={hands}
            w="100%"
            h="100%"
            borderRadius="30px"
            maxW="900px"
            objectFit="cover"
          />
        </Flex>
      </Grid>

      <Grid w="90vw" h="auto">
        <Flex mb="5vh">
          <Text fontSize={['xl', '3xl', '5xl']} fontWeight="semibold">
            Nuestro Staff!
          </Text>

          <VerTodos path="/staff" />
        </Flex>
        <Flex
          wrap={'wrap'}
          justifyContent={['center', 'center', 'space-between']}
          gap={['3vh', '3vh', '0', '0']}
          h="auto"
        >
          {staff.map(({ image, name }, index) => (
            <>
              <StaffThumbnail image={image} name={name} key={index} />
            </>
          ))}
        </Flex>
      </Grid>
      <Grid>
        <Flex mb="5vh" w="90vw">
          <Text fontSize={['xl', '3xl', '5xl']} fontWeight="semibold">
            Testimonios
          </Text>
          <VerTodos path="/testimonials" />
        </Flex>
        <Flex
          wrap="wrap"
          justifyContent={['center', 'center', 'space-between']}
          gap={['3vh', '3vh', '3vh']}
        >
          {testimonials.map((props, index) => (
            <>
              <TestimonialCard element={props} key={index} />
            </>
          ))}
        </Flex>
      </Grid>
      <Grid mb="10vh" w="90vw">
        <Flex mb="5vh" w="90vw">
          <Text fontSize={['xl', '3xl', '5xl']} fontWeight="semibold">
            Novedades
          </Text>
          <VerTodos path="/news" />
        </Flex>
        <Flex
          wrap="wrap"
          justifyContent={['center', 'center', 'space-between']}
          gap={['3vh', '3vh', '3vh']}
        >
          {news.map((props, index) => (
            <>
              <NewsCard element={props} key={props.id} />
            </>
          ))}
        </Flex>
      </Grid>

      {/* <Carousel /> */}
      {/* {latestNews &&
        latestNews.map(({ _id, title, briefDescription }) => {
          return (
            <Flex key={_id} ml="40px" p="20px" direction="column">
              <Text fontWeight="bold">{title}</Text>
              <Text>{briefDescription}</Text>
              </Flex>
              );
            })} */}
    </Grid>
  );
};
export default HomePage;
