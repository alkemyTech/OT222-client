import { Icon, Text, Link } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";


const VerTodos = ({ path }) => {
  const navigate = useNavigate();
  return (
    <>
      <Link href={`http://localhost:3000${path}`} display='flex' ml='auto'>
        <Text ml="auto" alignSelf="center" fontSize={["xl","2xl"]}>
          Ver Todos
        </Text>
        <Icon as={AiOutlineArrowRight} alignSelf="center" mr="5vw" w="50px" />
      </Link>
    </>
  );
};

export default VerTodos;
