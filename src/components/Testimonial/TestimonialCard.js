import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { Image } from "@chakra-ui/react";

const TestimonialCard = ({ element }) => {
  return (
    <>
      <Grid
        color={"black"}
        width={["90vw", "210px", "230px", "240px", "260px"]}
        maxH='300px'
        rounded={"25px"}
        background={"#FDFFA4"}
        border={"1px solid #F9FE00"}
        alignContent="inherit"
      >
        <Box >
          <Flex
            width={"75px"}
            height={"75px"}
            borderRadius={"50%"}
            align={"center"}
            ml={"20px"}
            mt={"10px"}
            mb={"10px"}
          >
            <Image
              width={"75px"}
              height={"75px"}
              borderRadius={"50%"}
              src={`${process.env.REACT_APP_SERVER_BASE_URL}/files/single/testimonial${element.image}`}
              alt={element.name}
            />
          </Flex>

          <Text
            width={"95%"}
            fontSize={"16px"}
            fontWeight={"bold"}
            textAlign={"start"}
            ml={"20px"}
            maxH='300px'
          >
            {element.name}
          </Text>
        </Box>
        <Text
          width={"95%"}
          fontSize={"16px"}
          textAlign={"start"}
          //dangerouslySetInnerHTML={{ __html: element.content }}
          padding={"10px"}
          overflow='hidden'

        >{`"${element.content}"`}</Text>
      </Grid>
    </>
  );
};

export default TestimonialCard;
