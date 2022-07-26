import { Box, Flex, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Grid } from "@chakra-ui/react";

const MemberThumbnail = (props) => {
  return (
    <>
      <Box
        position='relative'
        w="auto"
        h="auto"
      >
        <Image
          src={props.member.image}
          borderRadius={"15px"}
          w='100%'
          h='100%'
          fit='cover'
        />
        <Grid
          w='100%'
          h='100%'
          position='absolute'
          top='0'
        >
          <Text fontSize='3xl' mt='auto' mb='1rem' textAlign={'center'} fontWeight='bold' color='#fff' textShadow={'2px 2px 2px black'}>{props.member.name}</Text>
        </Grid>
      </Box>
    </>
  );
};

export default MemberThumbnail;
