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
import { Link } from 'react-router-dom';

function ActivityTable() {
  const [Activities, setActivities] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

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
            size={['400px', '600px', 'md', 'md']}
          >
            <Thead>
              <Tr>
                <Th fontSize={['8px', '10px', '12px', '16px']}>Imagen</Th>
                <Th fontSize={['8px', '10px', '12px', '16px']}>Nombre</Th>
                <Th fontSize={['8px', '10px', '12px', '16px']}>Actividad</Th>
                <Th fontSize={['8px', '10px', '12px', '16px']}>Editar</Th>
                <Th fontSize={['8px', '10px', '12px', '16px']}>Eliminar</Th>
              </Tr>
            </Thead>
            <Tbody>
              {Activities.map(activity => (
                <Tr key={activity.id}>
                  <Td fontSize={['8px', '10px', '12px', '16px']}>
                    <Image
                      width={['20px', '40px', '50px', '50px']}
                      height={['20px', '40px', '50px', '50px']}
                      borderRadius={'50%'}
                      src={activity.image}
                    />
                  </Td>
                  <Td fontSize={['8px', '10px', '12px', '16px']}>
                    {activity.name}
                  </Td>
                  <Td
                    fontSize={['8px', '10px', '12px', '16px']}
                    dangerouslySetInnerHTML={{
                      __html: `${activity.content.substring(0, 40)}...`,
                    }}
                  ></Td>
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
                        size={['20px', 'xs', 'sm']}
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
          alignItems={'flex-start'}
          mt="20px"
          mb="30px"
          mr={{
            base: '4px',
            sm: '495px',
            md: '700px',
            xl: '1110px',
            '2xl': '1510',
          }}
        >
          <Link to={'/add-activity'}>
            <Button
              background={'red'}
              color={'white'}
              fontWeight={'bold'}
              fontSize={['xs', 'xs', 'ms', 'ms']}
              borderRadius={'15px'}
              boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
            >
              ¡Agregar Actividad!
            </Button>
          </Link>
          <Link to={'/'}>
            <Button
              mt={'20px'}
              fontSize={['xs', 'xs', 'ms', 'ms']}
              background={'white'}
              boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
              borderRadius={'15px'}
            >
              {' '}
              Ir al inicio
            </Button>
          </Link>
        </Flex>
      </Flex>
    </>
  );
}

export default ActivityTable;
