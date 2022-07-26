import React from "react";
import { Flex, Grid, Image, Text } from "@chakra-ui/react";
const StaffThumbnail = ({ name, image }) => {
  return (
    <>
      <Flex position="relative" w={["90vw", "200px", "170px", "200px", "230px", "300px",]} _hover={{ transform: 'scale(1.1)' }} transition={'0.2s'} >
        <Image src={image} fit="cover" borderRadius={30} height={['200px', '300px']} width={'100%'} />
        <Grid position="absolute" top="0" w="100%" h="100%">
          <Text
            fontSize="2xl"
            mt="auto"
            mb="2rem"
            textAlign="center"
            fontWeight="bold"
            color="#fff"
            textShadow="1px 1px 2px black"
          >
            {name}
          </Text>
        </Grid>
      </Flex>
    </>
  );
};

export default StaffThumbnail;