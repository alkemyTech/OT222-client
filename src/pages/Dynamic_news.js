import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Grid, Flex, Text, Image, Icon } from '@chakra-ui/react';
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

  const fetchData = async () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_BASE_URL}/news/${path}`)
      .then(res => {
        setNewsDetail(res.data);
        setLoading(false);
        console.log('res.data', res.data);
      })
      .catch(err => {
        setNotFound(true);
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
        <Flex h="auto" w="100vw" flexDir={'column'}>
          <Image src={newsDetail.img || banner} fit={'cover'} />
          <Text fontSize={'6xl'} textAlign="center" fontWeight={'500'}>
            {newsDetail.name}
          </Text>
          <Flex w="100vw" justifyContent={'center'} my="15vh">
            <Text
              w={['70vw', '50vw']}
              fontSize={['xl', '2xl']}
              h="auto"
              dangerouslySetInnerHTML={{ __html: newsDetail.content }}
            />
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default Dynamic_news;
