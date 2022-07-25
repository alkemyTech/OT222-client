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
  Flex,
  Image,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from '../../services/authorization';
import TestimonyDeleteConfirmation from './TestimonyDeleteConfirmation';
import TestimonialForm from '../Testimonial/TestimonialForm';
import { Link } from 'react-router-dom';

const TestimonialTable = () => {
  const [testimonial, setTestimonial] = useState([]);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_SERVER_BASE_URL + '/testimonials')
      .then(res => setTestimonial(res.data.testimonials))
      .catch(err => console.log(err));
  }, [editing, deleting]);

  if (editing)
    return (
      /*<UserEditionForm contact={editing} setEditing={setEditing}>
        
      </UserEditionForm>*/
      <TestimonialForm
        values={editing}
        contact={editing}
        setEditing={setEditing}
      />
    );

  if (deleting)
    return (
      <TestimonyDeleteConfirmation
        testimonio={deleting}
        setDeleting={setDeleting}
      ></TestimonyDeleteConfirmation>
    );
  return (
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
              <Th fontSize={['8px', '10px', '12px', '16px']}>Testimonio</Th>
              <Th fontSize={['8px', '10px', '12px', '16px']}>Editar</Th>
              <Th fontSize={['8px', '10px', '12px', '16px']}>Eliminar</Th>
            </Tr>
          </Thead>
          <Tbody>
            {testimonial.map(testimonio => (
              <Tr key={testimonio.id}>
                <Td fontSize={['8px', '10px', '12px', '16px']}>
                  <Image
                    width={['20px', '40px', '50px', '50px']}
                    height={['20px', '40px', '50px', '50px']}
                    borderRadius={'50%'}
                    src={testimonio.image}
                  />
                </Td>
                <Td fontSize={['8px', '10px', '12px', '16px']}>
                  {testimonio.name}
                </Td>
                <Td
                  fontSize={['8px', '10px', '12px', '16px']}
                  dangerouslySetInnerHTML={{ __html: testimonio.content }}
                ></Td>
                <Td>
                  <Button
                    size={['20px', 'xs', 'sm']}
                    onClick={() => setEditing(testimonio)}
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
        <Link to={'/add-testimony'}>
          <Button
            background={'red'}
            color={'white'}
            fontWeight={'bold'}
            fontSize={['xs', 'xs', 'ms', 'ms']}
            borderRadius={'15px'}
            boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
          >
            ¡Agregar mi Testimonio!
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
  );
};
export default TestimonialTable;
