import React, { useState } from 'react';
import axios from '../../Services/authorization';
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
import { useEffect } from 'react';
import UserEditionForm from '../UserForm/UserEditionForm';
import DeleteConfirmation from './DeleteConfirmation';
import { useSelector } from 'react-redux';

function UsersTable() {
  const loggedUser = useSelector(state => state.user.user);
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_BASE_URL + '/users')
      .then(res => setUsers(res.data))
      .catch(err => console.log(err));
  }, [editing, deleting]);

  if (editing)
    return (
      <UserEditionForm user={editing} setEditing={setEditing}></UserEditionForm>
    );

  if (deleting)
    return (
      <DeleteConfirmation
        user={deleting}
        setDeleting={setDeleting}
      ></DeleteConfirmation>
    );
  return (
    <TableContainer width={'90%'}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nombre</Th>
            <Th>Apellido</Th>
            <Th>Email</Th>
            <Th>Editar</Th>
            <Th>Eliminar</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map(user => (
            <Tr key={user.id}>
              <Td>{user.firstName}</Td>
              <Td>{user.lastName}</Td>
              <Td>{user.email}</Td>
              <Td>
                <Button size="sm" onClick={() => setEditing(user)}>
                  Editar
                </Button>
              </Td>
              <Td>
                {loggedUser.id !== user.id && (
                  <Button
                    colorScheme="red"
                    variant="solid"
                    size="sm"
                    onClick={() => setDeleting(user)}
                  >
                    Eliminar
                  </Button>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
export default UsersTable;
