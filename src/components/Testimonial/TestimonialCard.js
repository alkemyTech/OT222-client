import { Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Image } from '@chakra-ui/react';

const TestimonialCard = ({ element }) => {
  return (
    <Flex
      flexDirection={'column'}
      color={'black'}
      width={['210px', '210px', '230px', '240px', '250px']}
      rounded={'25px'}
      background={'#FDFFA4'}
      border={'1px solid #F9FE00'}
    >
      <Flex
        width={'75px'}
        height={'75px'}
        borderRadius={'50%'}
        align={'center'}
        ml={'20px'}
        mt={'10px'}
        mb={'10px'}
      >
        <Image
          width={'75px'}
          height={'75px'}
          borderRadius={'50%'}
          src={element.image}
          alt={element.name}
        />
      </Flex>

      <Text
        width={'95%'}
        fontSize={'16px'}
        fontWeight={'bold'}
        textAlign={'start'}
        padding={'10px'}
      >
        {element.name}
      </Text>
      <Text
        width={'95%'}
        fontSize={'16px'}
        textAlign={'start'}
        dangerouslySetInnerHTML={{ __html: element.content }}
        padding={'10px'}
      />
    </Flex>
  );
};

export default TestimonialCard;
