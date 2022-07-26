import React from 'react';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function ButtonHome() {
  return (
    <div>
      <Link to={'/'}>
        <Button
          mt={'20px'}
          background={'white'}
          boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
          borderRadius={'15px'}
        >
          {' '}
          Ir al inicio
        </Button>
      </Link>
    </div>
  );
}

export default ButtonHome;
