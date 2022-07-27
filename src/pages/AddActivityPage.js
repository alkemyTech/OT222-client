import React from 'react';
import ActivityForm from '../components/Activity/ActivityForm';
import { Flex } from '@chakra-ui/react';

const AddActivityPage = () => {
  return (
    <Flex flexDirection={'column'} ml={'5%'} mt={'3%'} mb={'10%'}>
      <ActivityForm />
    </Flex>
  );
};

export default AddActivityPage;
