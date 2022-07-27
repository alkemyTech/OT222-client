import React from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../Buttons/BackButton';
import {
  TableContainer,
  Table,
  Thead,
  Flex,
  Tr,
  Text,
  Th,
  Tbody,
  Td,
  Button,
  Image,
  Box,
} from '@chakra-ui/react';
const TableComponent = ({ data, onEdit, onDelete, tableHeaders }) => {
  return (
    <>
      <Box p={5}>
        <Flex justify={'flex-end'}>
          <Link to={'/backoffice'}>
            <BackButton />
          </Link>
        </Flex>
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
      </Box>
    </>
  );
};
export default TableComponent;
