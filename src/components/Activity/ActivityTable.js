import React, { useState } from 'react';
import { useEffect } from 'react';
import BackButton from '../Buttons/BackButton';
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Text,
  Tbody,
  Td,
  Button,
  Flex,
  Image,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from '../../services/authorization';
import ActivityDeleteConfirmation from './ActivityDeleteConfirmation';
import ActivityForm from './ActivityForm';
import { Link, useNavigate } from 'react-router-dom';

function ActivityTable() {
  const [Activities, setActivities] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_BASE_URL + '/activities')
      .then(res => setActivities(res.data))
      .catch(err => console.log(err));
  }, [editing, deleting]);

  if (editing) return <ActivityForm values={editing} setEditing={setEditing} />;

  if (deleting)
    return (
      <ActivityDeleteConfirmation
        activity={deleting}
        setDeleting={setDeleting}
      ></ActivityDeleteConfirmation>
    );
  return (
    <>
      <Flex justify={'flex-end'} mt={'15px'} mr={'15px'}>
        <Link to={'/backoffice'}>
          <BackButton />
        </Link>
      </Flex>
      <Flex justify={'center'}>
        <Text
          mt={'20px'}
          mb={'20px'}
          fontSize={['36px']}
          fontWeight={'bold'}
          textAlign={'center'}
        >
          Actividades
        </Text>
      </Flex>
      <Flex justifyContent={'center'} flexDirection={'column'} align="center">
        <TableContainer mt="70px" mb="70px" width={'90%'}>
          <Table
            variant="striped"
            align="center"
          >
            <Thead>
              <Tr>
                <Th>Imagen</Th>
                <Th>Nombre</Th>
                <Th>Actividad</Th>
                <Th>Editar</Th>
                <Th>Eliminar</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Activities.map(activity => (
                <Tr key={activity.id}>
                  <Td>
                    <Image
                      width={'50px'}
                      height={'50px'}
                      objectFit={'cover'}
                      borderRadius={'50%'}
                      src={activity.image}
                    />
                  </Td>
                  <Td>
                    {activity.name}
                  </Td>
                  <Td
                  >`${activity.content.substring(0, 40)}...`</Td>
                  <Td>
                    <Button
                      size={['20px', 'xs', 'sm']}
                      onClick={() => setEditing(activity)}
                    >
                      <EditIcon />
                    </Button>
                  </Td>
                  <Td>
                    {
                      <Button
                        colorScheme="red"
                        variant="solid"
                        onClick={() => setDeleting(activity)}
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
        <Flex
          flexDirection={'column'}
          alignItems={'center'}
          mb="30px"
          gap={'20px'}
        >
          <Button
            variant='login'
            onClick={() => navigate('/add-activity')}
            maxWidth={'90%'}
          >
            ¡Agregar Actividad!
          </Button>
          <Button
            variant='login'
            maxWidth={'90%'}
            backgroundColor={'#f5f5f5'}
            color={'#000'}
            onClick={() => navigate('/')}
          >
            Ir al inicio
          </Button>
        </Flex>
      </Flex>
    </>
  );
}

export default ActivityTable;
