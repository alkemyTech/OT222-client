import { Button, Flex, Text } from '@chakra-ui/react';
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
    <Flex
      flexDirection={'column'}
      alignItems={'center'}
      color={'black'}
      width={['']}
      mt={'20px'}
      border={'solid black'}
      rounded={'25px'}
      ml={'20px'}
    >
      <Image
        rounded={'21px 21px 0px 0px'}
        textAlign={'center'}
        height={'300px'}
        mb={'15%'}
        src={element.image}
        alt={element.name}
      />
      <Text width={'95%'} fontSize={'16px'} textAlign={'center'}>
        {element.name}{' '}
      </Text>
      <Link to={`/news/${element.id}`}>
        <Button
          mt={'10%'}
          background={'red'}
          color={'white'}
          mb={'10px'}
          onClick={() => {
            getNewsById(element.id);
          }}
        >
          Ver Detalle
        </Button>
      </Link>
    </Flex>
  );
};

export default NewsCard;
