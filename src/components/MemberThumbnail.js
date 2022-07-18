import React from "react";
import { Grid, Flex, Text, Image, Box } from "@chakra-ui/react";
const MemberThumbnail = ({ name, image, role }) => {
  return (
    <>
      <Box
        position='relative'
      >
        <Image
          src={image || 'https://res.cloudinary.com/diylksocz/image/upload/v1658110483/photo-1507003211169-0a1dd7228f2d_ivrb7x.jpg'}
          w="20rem"
          h="20rem"
          fit="cover"
          borderRadius="15px"
          
        ></Image>
        <Flex w="100%" h="100%" position='absolute' top='0' justifyContent='center' alignContent='center'>
            <Box mt='auto' mb='2vh'>
                <Text textAlign='center' fontSize='3xl' fontWeight='semibold' color='#fff' textShadow='1px 2px #000'>{name}</Text>
            </Box>
        </Flex>
      </Box>
    </>
  );
};

export default MemberThumbnail;
