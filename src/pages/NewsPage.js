import React from 'react';
import NewsCard from "../components/NewsCard"
import {Flex, Text,Grid } from "@chakra-ui/react";


const NewsPage = () => {
  const data = [
    {
      id: 1,
      image: "https://www.fundacion-affinity.org/sites/default/files/dia-de-los-animales.jpg",
      alt: "foto1",
     name: "Aca escribo un titulo que sea mas o menos largo como para probar",
    },
    {
      id: 2,
      image: "https://assets.afcdn.com/story/20161017/989289_w1200h630c1cx511cy250.jpg",
      alt: "foto2",
      name: "Aca escribo un titulo que sea mas o menos largo como para probar",
    },
    {
      id: 3,
      image: "https://okdiario.com/img/2018/11/20/leopardo.jpg",
      alt: "foto3",
      name: "Aca escribo un titulo que sea mas o menos largo como para probar",
    },

];
  return (
    <Flex
    flexDirection={"column"}
    width={"95%"}
    textAlign={"center"}
    height={["400vh","200vh"]}
    >
    <Text
        fontSize={["36px"]}
        fontWeight={"bold"}
        textAlign={"center"}
    >Novedades</Text>
    <Grid
    gridTemplateColumns={["1fr 1fr","1fr 1fr","1fr 1fr 1fr 1fr"]}
    gridGap={"20px"}
    textAlign={"center"} //alinea los titulos
    justifySelf={"center"}
    >
        {data.map((dato)=>{
        return(
           
         <NewsCard element={dato} key={dato.id}/>
        )
      })
      }

    </Grid>
    
    </Flex>
  )
}

export default NewsPage