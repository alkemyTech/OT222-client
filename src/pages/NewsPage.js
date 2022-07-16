import React, { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard';
import { Flex, Text, Grid } from '@chakra-ui/react';
import axios from '../Services/authorization/index';

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
      flexDirection={'column'}
      width={'95%'}
      textAlign={'center'}
      height={['400vh', '200vh']}
    >
      <Text fontSize={['36px']} fontWeight={'bold'} textAlign={'center'}>
        Novedades
      </Text>
      <Grid
        gridTemplateColumns={['1fr 1fr', '1fr 1fr', '1fr 1fr 1fr 1fr']}
        gridGap={'20px'}
        textAlign={'center'} //alinea los titulos
        justifySelf={'center'}
      >
        {data.map(dato => {
          return <NewsCard element={dato} key={dato.id} />;
        })}
      </Grid>
    </Flex>
  );
};

export default NewsPage;
