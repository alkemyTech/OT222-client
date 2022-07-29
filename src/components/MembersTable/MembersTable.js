import React, { useState } from 'react';
import { useEffect } from 'react';
import BackButton from '../Buttons/BackButton';
import { Link } from 'react-router-dom';
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Button,
  Flex,
  Text,
  Image,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from '../../services/authorization';
import MemberDeleteConfirmation from '../MembersTable/MembersDeleteConfirmation';

const MembersTable = () => {
  const [members, setMembers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_BASE_URL + process.env.REACT_APP_MEMBERS_GET)
      .then(res => setMembers(res.data))
      .catch(err => console.log(err));
  }, [editing, deleting]);

  if (editing) return <div> hay que hacer un form de edicion de contacto</div>;

  if (deleting)
    return (
      <MemberDeleteConfirmation
        member={deleting}
        setDeleting={setDeleting}
      ></MemberDeleteConfirmation>
    );
  return (
    <>
      <Flex justify={'flex-end'} mt={'15px'} mr={'15px'}>
        <Link to={'/backoffice'}>
          <BackButton />
        </Link>
      </Flex>

      <Flex flexDirection={'column'} m={'20px'} alignItems={'center'}>
        <Text fontSize={'30px'} fontWeight={'bold'} textAlign={'center'}>
          {' '}
          Lista de Miembros
        </Text>
        <TableContainer width={'90%'}>
          <Table
            variant="striped"
            align="center"
            size={['400px', '600px', 'md', 'md']}
          >
            <Thead>
              <Tr>
                <Th fontSize={['8px', '10px', '12px', '16px']}>Image</Th>
                <Th fontSize={['8px', '10px', '12px', '16px']}>Name</Th>
                <Th fontSize={['8px', '10px', '12px', '16px']}>Editar</Th>
                <Th fontSize={['8px', '10px', '12px', '16px']}>Eliminar</Th>
              </Tr>
            </Thead>
            <Tbody>
              {members.map(member => (
                <Tr key={member.id}>
                  <Td fontSize={['8px', '10px', '12px', '16px']}>
                    <Image
                      width={['20px', '40px', '50px', '50px']}
                      height={['20px', '40px', '50px', '50px']}
                      borderRadius={'50%'}
                      src={member.image}
                    />
                  </Td>
                  <Td fontSize={['8px', '10px', '12px', '16px']}>
                    {member.name}
                  </Td>
                  <Td>
                    <Button
                      size={['20px', 'xs', 'sm']}
                      onClick={() => setEditing(member)}
                    >
                      <EditIcon />
                    </Button>
                  </Td>
                  <Td>
                    {
                      <Button
                        colorScheme="red"
                        variant="solid"
                        size={['20px', 'xs', 'sm']}
                        onClick={() => setDeleting(member)}
                      >
                        <DeleteIcon />
                      </Button>
                    }
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
};
export default MembersTable;
