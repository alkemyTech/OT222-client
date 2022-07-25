import React, { useState } from 'react';
import { Flex, Button, Text, Heading } from '@chakra-ui/react';
import axios from '../../services/authorization/index';
import { confirmation } from '../../services/alerts/index';
import LoaderSpinner from '../LoaderSpinner';

function NewsDeleteConfirmation({ news, setDeleting }) {
  const [loading, setLoading] = useState(false);

  const deleteNews = () => {
    setLoading(true);
    axios
      .delete('/news/' + news.id)
      .then(res => {
        setLoading(false);
        setDeleting(null);
        confirmation(news.name, 'Ha sido borrado con éxito.');
      })
      .catch(err => console.log(err));
  };

  if (loading) return <LoaderSpinner></LoaderSpinner>;

  return (
    <Flex
      flexDirection={'column'}
      gap={'20px'}
      width={'520px'}
      maxWidth={'90%'}
      mt={'3%'}
      mb={'10%'}
      boxShadow="dark-lg"
      rounded="ms"
      bg="white"
      p={'2rem'}
    >
      <Heading as="h2" size="lg" mb={'1rem'}>
        ¿Está seguro que desea eliminar la novedad de {news.name}?
      </Heading>
      <Flex justifyContent={'space-between'}>
        <Button
          onClick={() => {
            setDeleting(null);
          }}
        >
          Cancelar
        </Button>
        <Button colorScheme="red" onClick={() => deleteNews()}>
          Eliminar
        </Button>
      </Flex>
    </Flex>
  );
}
export default NewsDeleteConfirmation;
