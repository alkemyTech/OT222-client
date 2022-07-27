import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { MdArrowBack } from 'react-icons/md';

function BackButton() {
  return (
    <ButtonGroup spacing={4}>
      <Button colorScheme="gray" size="md" variant={('ghost', 'outline')}>
        <MdArrowBack /> Atras
      </Button>
    </ButtonGroup>
  );
}

export default BackButton;
