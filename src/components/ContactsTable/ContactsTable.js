import React, { useState } from "react";
import { useEffect } from "react";
import { TableContainer, Table, Thead, Tr, Th, Tbody, Td, Button, Flex } from '@chakra-ui/react';
import { EditIcon, DeleteIcon} from '@chakra-ui/icons'
import axios from "../../Services/authorization/index";
import ContactDeleteConfirmation from "../ContactsTable/ContactDeleteConfirmation";

const ContactsTable = () => {
  const [contacts, setContacts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_BASE_URL + '/contacts')
      .then(res => setContacts(res.data))
      .catch(err => console.log(err));
  }, [editing, deleting]);

  if (editing)
    return (
      /*  <UserEditionForm contact={editing} setEditing={setEditing}></UserEditionForm> */
      <div> hay que hacer un form de edicion de contacto</div>
    );

  if (deleting)
    return (
      <ContactDeleteConfirmation
        contact={deleting}
        setDeleting={setDeleting}
      ></ContactDeleteConfirmation>
    );
  return (
    <Flex
    justifyContent={"center"}
    >
    <TableContainer
    width={"90%"}
    >
    <Table 
    variant='striped'
    align="center"
    size={["400px","600px", "md", "md"]}
    >
        <Thead>
            <Tr>
                <Th fontSize={["8px", "10px", "12px", "16px"]}>Nombre</Th>
                <Th fontSize={["8px", "10px", "12px", "16px"]}>Telefono</Th>
                <Th fontSize={["8px", "10px", "12px", "16px"]}>Email</Th>
                <Th fontSize={["8px", "10px", "12px", "16px"]}>Mensaje</Th>
                <Th fontSize={["8px", "10px", "12px", "16px"]}>Editar</Th>
                <Th fontSize={["8px", "10px", "12px", "16px"]}>Eliminar</Th>
            </Tr>
        </Thead>
        <Tbody>
            {contacts.map(contact => (
                <Tr key={contact.id}>
                    <Td
                    fontSize={["8px", "10px", "12px", "16px"]}>{contact.name}</Td>
                    <Td
                    fontSize={["8px", "10px", "12px", "16px"]}>{contact.phone}</Td>
                    <Td
                    fontSize={["8px", "10px", "12px", "16px"]}>{contact.email}</Td>
                    <Td
                    fontSize={["8px", "12px", "12px", "16px"]}>{contact.message}</Td>
                    <Td><Button  size={["20px","xs","sm"]} onClick={() => setEditing(contact)}><EditIcon /></Button></Td>
                    <Td>{<Button colorScheme="red" variant="solid" size={["20px","xs","sm"]} onClick={() => setDeleting(contact)}><DeleteIcon /></Button>}</Td>
                </Tr>
            ))}
        </Tbody>
    </Table>
</TableContainer >

    </Flex>
  )
}
export default ContactsTable

