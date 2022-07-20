import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Utils: footer content
import { FaFacebookSquare } from 'react-icons/fa';
import { AiFillLinkedin } from 'react-icons/ai';
import { BsInstagram } from 'react-icons/bs';

import footerContent from '../../utils/footerContent';
// Styles: chacra ui
import {
  Box,
  Flex,
  Grid,
  Text,
  Image,
  Link,
  HStack,
  Button,
  useColorModeValue,
  Container,
  Stack,
} from '@chakra-ui/react';

const Footer = () => {
  const [urlMedia, seturlMedia] = useState([]);
  const icons = [
    { name: 'Facebook', icon: <FaFacebookSquare /> },
    { name: 'Linkedin', icon: <AiFillLinkedin /> },
    { name: 'Instagram', icon: <BsInstagram /> },
  ];
  const items = [
    {
      name: 'Inicio',
      link: '/',
    },
    {
      name: 'Nosotros',
      link: '/staff',
    },
    {
      name: 'Testimonios',
      link: '/testimonials',
    },
    {
      name: 'Contacto',
      link: '/contact',
    },
    {
      name: 'Contribuye',
      link: '/contribute',
    },
    {
      name: 'Backoffice',
      link: '/backoffice',
    },
  ];

  const fetchUrlMedia = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/organizations/public`)
      .then(function (response) {
        seturlMedia(response.data.slice(0, 3));
        console.log(response.data.slice(0, 3));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchUrlMedia();
  }, []);
  console.log(urlMedia);
  return (
    /*<Box
      p={['10px', '10px']}
      bgColor="#f8f9fa"
      position="relative"
      bottom={0}
      w="100%"
    >*/
    <Box
      bg={useColorModeValue('gray.400', 'gray.400')}
      color={useColorModeValue('black', 'gray.200')}
    >
      <Container
        as={Stack}
        maxW={'6xl'}
        py={4}
        spacing={4}
        justify={'center'}
        align={'center'}
      >
        {footerContent.map(({ logo }) => {
          return <Image src={logo} alt="" />;
        })}
        <Stack direction={{ base: 'column', md: 'row' }} spacing={6}>
          {items.map(({ link, name }) => (
            <Link href={link}>{name}</Link>
          ))}
        </Stack>
      </Container>
      <Box
        borderTopWidth={3}
        borderStyle={'solid'}
        borderColor={useColorModeValue('black')}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}
        >
          <HStack
            _hover={{ cursor: 'pointer' }}
            color="white"
            fontSize={'35px'}
            direction={'row'}
            spacing={6}
          >
            {urlMedia.map(({ SocialMedium }, index) => (
              <>
                <Link href={SocialMedium.url}>{icons[index].icon}</Link>
              </>
            ))}
          </HStack>
          <Text>2022 by Alkemy. All rights reserved</Text>
        </Container>
      </Box>
      {/*<Flex direction="column" maxW="1280px" m={['0', 'auto']}>
          <Grid templateColumns="repeat(auto-fill, minmax(185px, 1fr))">
            {footerContent.map(({ _id, title, logo, dir, socialMedia }) => {
              return (
                <Flex key={_id} direction="column" textAlign="left" ml="50px">
                  <Text
                    fontSize="18px"
                    color="black"
                    mb="10px"
                    fontWeight="bold"
                  >
                    {title}
                  </Text>
                  {logo && <Image src={logo} alt={_id} />}
                  {dir && (
                    <Text>
                      <Link
                        href="/"
                        mb="5px"
                        fontSize="16px"
                        _hover={{ color: 'green', transition: '200ms ease-in' }}
                      >
                        {dir}
                      </Link>
                    </Text>
                  )}
                  {socialMedia &&
                    socialMedia.map(({ _id, media, href }) => {
                      return (
                        
                        <Text key={_id}>
                          <Stack direction={'row'} spacing={6}>
                          <Button m="5px" colorScheme={media}>
                            <Link href={href}>{media}</Link>
                          </Button>
                          </Stack>
                        </Text>
                        
                      );
                    })}
                </Flex>
              );
            })}
        </Grid>
        </Flex>*/}
    </Box>
  );
};

export default Footer;
