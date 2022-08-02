import React, { useState } from 'react';
import { useEffect } from 'react';
import BackButton from '../Buttons/BackButton';
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Text,
  Td,
  Button,
  Flex,
  Image,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from '../../services/authorization';
import TestimonyDeleteConfirmation from './TestimonyDeleteConfirmation';
import TestimonialForm from '../Testimonial/TestimonialForm';
import { Link, useNavigate } from 'react-router-dom';

const TestimonialTable = () => {
  const [testimonial, setTestimonial] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_SERVER_BASE_URL +
          process.env.REACT_APP_TESTIMONIALS_GET
      )
      .then(res => setTestimonial(res.data))
      .catch(err => console.log(err));
  }, [editing, deleting]);

  if (editing)
    return <TestimonialForm values={editing} setEditing={setEditing} />;

  if (deleting)
    return (
      <TestimonyDeleteConfirmation
        testimonio={deleting}
        setDeleting={setDeleting}
      ></TestimonyDeleteConfirmation>
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
          Testimonios
        </Text>
      </Flex>
      <Flex justifyContent={'center'} flexDirection={'column'} align="center">
        <TableContainer mt="70px" mb="70px" width={'90%'}>
          <Table variant="striped" align="center">
            <Thead>
              <Tr>
                <Th>Imagen</Th>
                <Th>Nombre</Th>
                <Th>Testimonio</Th>
                <Th>Editar</Th>
                <Th>Eliminar</Th>
              </Tr>
            </Thead>
            <Tbody>
              {testimonial.map(testimonio => (
                <Tr key={testimonio.id}>
                  <Td>
                    <Image
                      width={'50px'}
                      height={'50px'}
                      borderRadius={'50%'}
                      src={`${process.env.REACT_APP_SERVER_BASE_URL}/files/single/${testimonio.image}`}
                      objectFit={'cover'}
                    />
                  </Td>
                  <Td>{testimonio.name}</Td>
                  <Td>
                    <Text
                      dangerouslySetInnerHTML={{ __html: testimonio.content }}
                    />
                  </Td>
                  <Td>
                    <Button onClick={() => setEditing(testimonio)}>
                      <EditIcon />
                    </Button>
                  </Td>
                  <Td>
                    {
                      <Button
                        colorScheme="red"
                        variant="solid"
                        onClick={() => setDeleting(testimonio)}
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
          justifyContent={'center'}
          gap={'20px'}
          marginBottom={'70px'}
        >
          <Button
            variant={'login'}
            onClick={() => navigate('/add-testimony')}
            maxWidth={'90%'}
          >
            ¡Agregar mi Testimonio!
          </Button>
          <Button
            variant={'login'}
            backgroundColor={'#f5f5f5'}
            color={'#000'}
            onClick={() => {
              navigate('/');
            }}
            maxWidth={'90%'}
          >
            Ir al inicio
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
export default TestimonialTable;
