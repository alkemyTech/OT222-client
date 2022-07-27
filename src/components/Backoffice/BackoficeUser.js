import { Flex, Grid } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import BackofficeCard from '../BackofficeCard';
import perfilIcon from '../../assets/perfil.png';

const BackofficeUser = () => {
  const data = [
    {
      id: 1,
      img: perfilIcon,
      alt: 'perfil-icon',
      title: 'Perfil',
      route: '/profile',
    },
  ];
  return (
    <Flex justifyContent={'center'}>
      <Grid
        gridTemplateColumns={['1fr', '1fr', '1fr 1fr 1fr 1fr']}
        gridGap={'10px'}
        width={'80%'}
        textAlign={'center'}
        justifySelf={'center'}
        marginY={'2rem'}
      >
        {data.map(dato => {
          return <BackofficeCard key={dato.id} element={dato} />;
        })}
      </Grid>
    </Flex>
  );
};
export default BackofficeUser;
