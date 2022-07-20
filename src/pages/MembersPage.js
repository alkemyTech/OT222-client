import React, { useEffect, useState } from "react";
import { Flex, Grid, Text, Image } from "@chakra-ui/react";
import MemberThumbnail from "../components/MemberThumbnail";
import axios from "axios";

const MembersPage = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`${process.env.REACT_APP_SERVER_BASE_URL}/members`)
        .then((res) => setData(res.data));
    };
    fetchData();
  }, []);

  return (
    <>
      <Grid h="auto" w="100vw" justifyContent={"center"} alignContent='center'>
        <Text fontSize={['4xl','5xl']} textAlign='center' mt='5vh' mb='5vh'>Nuestro Staff!</Text>
        <Grid
          justifyContent="center"
          alignContent="center"
          w="80vw"
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(3, 1fr)",
            "repeat(4, 1fr)",
          ]}
          gap="2vw"
        >
          {data &&
            data.map((member, index) => (
              <MemberThumbnail
                name={member.name}
                key="index"
                image={member.image}
              />
            ))}
        </Grid>
      </Grid>
    </>
  );
};

export default MembersPage;
