import React from "react"
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Image,
  Box,
} from "@chakra-ui/react"
const TableComponent = ({ data, onEdit, onDelete }) => {
  return (
    <Box p={5}>
      <TableContainer>
        <Table size="sm" borderWidth="1px" borderColor="gray.200">
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Date</Th>
              <Th>Image</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.map(
                ({ _id, name, createdAt, image, alt, briefDescription }) => (
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
                      <Button
                        onClick={() => onEdit(_id)}
                        colorScheme="blue"
                        variant="outline"
                        size="sm"
                        mr="2"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => onDelete(_id)}
                        colorScheme="red"
                        variant="outline"
                        size="sm"
                        ml="2"
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                )
              )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}
export default TableComponent
