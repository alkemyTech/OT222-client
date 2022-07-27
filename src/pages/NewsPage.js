import React, { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import { Flex, Text, Grid } from '@chakra-ui/react';
import axios from '../services/authorization/index';

const NewsPage = () => {
  const [data, setData] = useState([]);
  const getNews = () => {
    axios
      .get(process.env.REACT_APP_SERVER_BASE_URL + '/news')
      .then(res => {
        setData(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <Flex
      width={'100%'}
      minHeight={'100vh'}
      direction={'column'}
      padding={'1rem'}
      gap={'1rem'}
    >
      <Text fontSize={['36px']} fontWeight={'bold'} textAlign={'center'}>
        Novedades
      </Text>
      <Flex justifyContent={'center'} wrap={'wrap'} gap={'1rem'}>
        {data.length === 0 && (
          <Text fontSize={'26px'} textAlign={'center'}>
            No se han encontrado novedades
          </Text>
        )}
        {data.map(dato => {
          return <NewsCard element={dato} key={dato.id} />;
        })}
      </Flex>
    </Flex>
  );
};

export default NewsPage;
