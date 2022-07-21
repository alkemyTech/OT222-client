import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Flex, Text, Image, Icon, Button } from '@chakra-ui/react';
import axios from 'axios';
import banner from '../assets/newsBanner.png';
import { TbError404 } from 'react-icons/tb';
import LoaderSpinner from '../components/LoaderSpinner';

const Dynamic_news = () => {
  const location = useLocation();
  const path = location.pathname.split('/')[2];
  const [newsDetail, setNewsDetail] = useState({});
  const [isLoading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const navigate = useNavigate()

  const fetchData = async () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/news/${path}`)
      .then(res => {
        if (res.data.message === 'Not Found!.') return setNotFound(true)
        setNewsDetail(res.data);
        setLoading(false);
        console.log('res.data', res.data);
      })
      .catch(err => {
      });
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  if (isLoading) {
    return <LoaderSpinner />;
  }

  return (
    <>
      {!!notFound ? (
        <Grid
          h="50vw"
          w="100vw"
          justifyContent={'center'}
          alignContent="center"
        >
          <Icon
            as={TbError404}
            w={['100px', '200px']}
            h={['100px', '200px']}
            justifySelf={'center'}
          />
          <Text fontSize={['3xl', '6xl']}>ERROR 404: New Not Founded!.</Text>
        </Grid>
      ) : (
        <Flex flexDir={'column'}>
          <Image src={newsDetail.image || banner} objectFit={'cover'} height={"50vh"} width={"100%"} />
          <Flex flexDir={'column'} marginY={'10%'} alignItems={'center'} gap={'5rem'} textAlign={'center'} padding={'1rem'} >
            <Text fontSize={['2rem', '3rem']} textAlign="center" fontWeight={'500'}>
              {newsDetail.name}
            </Text>
            <Text
              fontSize={['xl', '2xl']}
              h="auto"
              maxWidth={['100%', '50%']}
            >
              {newsDetail.content}
            </Text>
            <Button onClick={() => navigate('/news')}>← Volver</Button>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default Dynamic_news;
