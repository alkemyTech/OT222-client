import React from "react";
import { Link } from "react-router-dom";
import {
  TableContainer,
  Table,
  Thead,
  Flex,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Image,
  Box,
} from "@chakra-ui/react";
const TableComponent = ({ data, onEdit, onDelete, tableHeaders }) => {
  return (
    <Box p={5} mt="30px">
      <TableContainer>
        <Table size="sm" borderWidth="1px" borderColor="gray.200">
          <Thead>
            <Tr>
              {tableHeaders.map((header, index) => (
                <Th key={index}>{header}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.map(
                ({
                  _id,
                  name,
                  createdAt,
                  image,
                  alt,
                  briefDescription,
                  id,
                  content,
                }) => (
                  <Tr key={_id}>
                    {name && <Td>{name}</Td>}
                    {createdAt && <Td>{createdAt}</Td>}
                    {image && (
                      <Td>
                        <Image
                          w="50px"
                          h="50px"
                          objectFit="cover"
                          src={image}
                          alt={alt}
                        />
                      </Td>
                    )}
                    <Td>
                      {onEdit && (
                        <Button
                          onClick={() =>
                            onEdit(
                              _id || {
                                id,
                                name,
                                image,
                                createdAt,
                                alt,
                                content,
                              }
                            )
                          }
                          colorScheme="blue"
                          variant="outline"
                          size="sm"
                          mr="2"
                        >
                          Editar
                        </Button>
                      )}
                      {onDelete && (
                        <Button
                          onClick={() => onDelete(_id || id)}
                          colorScheme="red"
                          variant="outline"
                          size="sm"
                          ml="2"
                        >
                          Eliminar
                        </Button>
                      )}
                    </Td>
                  </Tr>
                )
              )}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex
        flexDirection={"column"}
        alignItems={"flex-start"}
        mt="20px"
        mb="30px"
        mr={{
          base: "4px",
          sm: "495px",
          md: "700px",
          xl: "1110px",
          "2xl": "1510",
        }}
      >
        <Link to={"/add-new"}>
          <Button
            background={"red"}
            color={"white"}
            fontWeight={"bold"}
            fontSize={["xs", "xs", "ms", "ms"]}
            borderRadius={"15px"}
            boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
          >
            ¡Agregar Novedad!
          </Button>
        </Link>
        <Link to={"/"}>
          <Button
            mt={"20px"}
            fontSize={["xs", "xs", "ms", "ms"]}
            background={"white"}
            boxShadow={"0px 4px 4px rgba(0, 0, 0, 0.25)"}
            borderRadius={"15px"}
          >
            {" "}
            Ir al inicio
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};
export default TableComponent;
