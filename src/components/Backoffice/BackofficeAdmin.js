import {Flex, Grid } from "@chakra-ui/react";
import React, {useState, useEffect} from "react";
import BackofficeCard from "../BackofficeCard";
import novedadesIcon from "../../assets/novedades.jpeg";
import categoriasIcon from "../../assets/categorias.png";
import miembrosIcon from "../../assets/miembos.png";
import organizacionIcon from "../../assets/organizacion.png";
import slidesIcon from "../../assets/slides.png";
import testimoniosIcon from "../../assets/testimonios.png";
import usuariosIcon from "../../assets/usuarios.png";
import actividadesIcon from "../../assets/actividades.png";

const BackofficeAdmin = () =>{
    const data = [
      {
        id: 1,
        img: novedadesIcon,
        alt: "novedades-icon",
        title: "Novedades",
        route:"/news"
      },
      {
        id: 2,
        img: actividadesIcon,
        alt: "actividades-icon",
        title: "Actividades",
        route:"activities",
      },
      {
        id: 3,
        img: categoriasIcon,
        alt: "categorias-icon",
        title: "Categorias",
        route:""
      },
      {
        id: 4,
        img: miembrosIcon,
        alt: "miembros-icon",
        title: "Miembros",
        route:"",
      },
      {
        id: 5,
        img: organizacionIcon,
        alt: "organizacion-icon",
        title:"Organizacion",
        route:"",
      },
      {
        id: 6,
        img: slidesIcon,
        alt: "slides-icon",
        title: "Slides",
        route:"",
      },
      {
        id: 7,
        img: testimoniosIcon,
        alt: "testimonios-icon",
        title: "Testimonios",
        route:"/testimonials",
      },
      {
        id: 8,
        img: usuariosIcon,
        alt: "usuarioss-icon",
        title: "Usuarios",
        route:"users-list",
        
    },];
  
  
 return(
    <Flex
    justifyContent={"center"}
    >
    <Grid
    
    gridTemplateColumns={["1fr 1fr","1fr 1fr","1fr 1fr 1fr 1fr"]}
    gridGap={"10px"}
    width={"80%"}
    textAlign={"center"} //alinea los titulos
    justifySelf={"center"}
    >
    {data.map((dato=>{
        return(
            <BackofficeCard key={dato.id} element={dato}/>
        )
    }))}
    </Grid>
    
    </Flex>
    
    ) 
}
export default BackofficeAdmin;