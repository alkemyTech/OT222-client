import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Grid, Flex, Text, Image, Icon } from "@chakra-ui/react";
import axios from "axios";
import banner from "../assets/newsBanner.png";
import { TbError404 } from "react-icons/tb";
const Dynamic_news = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`${process.env.REACT_APP_SERVER_BASE_URL}/news/${path}`);
      const data = res.data;
      setData(data);
    };
    fetchData();
  }, []);
  return (
    <>
      {data.message !== "Not Found" ? (
        <Grid
          h="50vw"
          w="100vw"
          justifyContent={"center"}
          alignContent="center"
        >
          <Icon as={TbError404} w={['100px', '200px']} h={['100px', '200px']} justifySelf={'center'} />
          <Text fontSize={["3xl", "6xl"]}>ERROR 404: New Not Founded!.</Text>
        </Grid>
      ) : (
        <Flex h="auto" w="100vw" flexDir={"column"}>
          <Image src={data.img || banner} fit={"cover"} />
          <Text fontSize={"6xl"} textAlign="center" fontWeight={"500"}>
            {data.name}
          </Text>
          <Flex w="100vw" justifyContent={"center"} my="15vh">
            <Text w={["70vw", "50vw"]} fontSize={["xl", "2xl"]} h="auto">
              {data.content}
            </Text>
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default Dynamic_news;
