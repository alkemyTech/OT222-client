import { Button, Flex, Grid, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import axios from '../services/authorization/index';

const NewsCard = ({ element }) => {
  const [newsId, setNewsId] = useState('');
  const getNewsById = id => {
    axios
      .get(process.env.REACT_APP_SERVER_BASE_URL + `/news/${id}`)
      .then(res => {
        setNewsId(res.data);
      })
      .catch(err => console.log(err));
  };
  return (
    <Grid
      gridTemplate={'3fr 1fr / 1fr 1fr'}
      gap={'1rem'}
      border={'1px solid #0038FF'}
      //width={["90vw", '350px','400px','448px']}
      w={['25vw']}
      minWidth='256px'
      borderRadius={'20px'}
      padding={'1rem'}
      backgroundColor={'#7E9AFD'}
    >
      <Image
        objectFit={'cover'}
        borderRadius={'20px'}
        height={'100%'}
        //src={`${process.env.REACT_APP_SERVER_BASE_URL}/files/single/${element.image}`}
        src={element.image}
        alt={element.name}
        gridArea={'1 / 1 / 3 / 2'}
      />
      <Text
        width={'95%'}
        fontSize={'16px'}
        textAlign={'center'}
        margin={'auto'}
      >
        {element.content}{' '}
      </Text>
      <Link to={`/news/${element.id}`}>
        <Button
          background={'blue'}
          color={'white'}
          margin={'auto'}
          width={'100%'}
          onClick={() => {
            getNewsById(element.id);
          }}
        >
          Ver Detalle
        </Button>
      </Link>
    </Grid>
  );
};

export default NewsCard;
