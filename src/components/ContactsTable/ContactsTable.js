import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
} from '@chakra-ui/react';
import axios from '../../services/authorization/index';
import UserEditionForm from '../UserForm/UserEditionForm';
import ContactDeleteConfirmation from '../ContactsTable/ContactDeleteConfirmation';

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
    <TableContainer width={'90%'}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Telefono</Th>
            <Th>Email</Th>
            <Th>Mensaje</Th>
            <Th>Editar</Th>
            <Th>Eliminar</Th>
          </Tr>
        </Thead>
        <Tbody>
          {contacts.map(contact => (
            <Tr key={contact.id}>
              <Td>{contact.name}</Td>
              <Td>{contact.phone}</Td>
              <Td>{contact.email}</Td>
              <Td>{contact.message}</Td>
              <Td>
                <Button size="sm" onClick={() => setEditing(contact)}>
                  Editar
                </Button>
              </Td>
              <Td>
                {
                  <Button
                    colorScheme="red"
                    variant="solid"
                    size="sm"
                    onClick={() => setDeleting(contact)}
                  >
                    Eliminar
                  </Button>
                }
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
export default ContactsTable;
