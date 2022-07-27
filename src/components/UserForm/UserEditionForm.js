import React, { useState, useEffect } from 'react';
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { Flex, Input, Button, Stack, Text } from '@chakra-ui/react';
import * as Yup from 'yup';
import axios from '../../services/authorization/index';
import { confirmation } from '../../services/alerts/index';

function UserEditionForm({ user, setEditing }) {
  const { firstName, lastName, roleId, isAdmin } = user;
  const initialValues = {
    firstName,
    lastName,
    ...(isAdmin && { roleId }),
  };

  const [isAdminUser, setisAdminUser] = useState(false);

  useEffect(() => {
    setisAdminUser(!!isAdmin);
  }, []);

  const validationSchema = Yup.object({
    firstName: Yup.string().required('Por favor escribe tu nombre'),
    lastName: Yup.string().required('Por favor escribe tu Apellido'),
    ...(!!isAdmin && {
      roleId: Yup.number().required(
        'Por favor escribe un numero para rol del usuario'
      ),
    }),
  });

  const onSubmit = (values, actions) => {
    console.log(values);
    axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/users/${user.id}`, values)
      .then((res) => {
        setEditing(false);
        confirmation('Usuario editado con éxito');
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  const profileOruser = isAdminUser ? ' Usuario' : 'Mi Perfil';

  return (
    <FormikProvider value={formik}>
      <Flex
        as={Form}
        className="form"
        flexDirection={'column'}
        gap={'20px'}
        width={'520px'}
        maxWidth={'90%'}
        mt={'3%'}
        mb={'10%'}
        boxShadow="dark-lg"
        rounded="ms"
        bg="white"
        p={'2rem'}
      >
        <Flex fontWeight={'bold'} fontSize={'24px'}>
          {`Editar ${profileOruser}`}
        </Flex>

        <div>
          <label htmlFor="firstName">Nombre</label>
          <Field as={Input} id="title" type="text" name="firstName" />
          <Text color="red">
            <ErrorMessage name="firstName" />
          </Text>
        </div>

        <div>
          <label htmlFor="lastName">Apellido</label>
          <Field as={Input} id="title" type="text" name="lastName" />
          <Text color="red">
            <ErrorMessage name="lastName" />
          </Text>
        </div>

        {!!isAdminUser && (
          <div>
            <label htmlFor="roleId">Rol del Usuario</label>
            <Field as={Input} id="title" type="text" name="roleId" />
            <Text color="red">
              <ErrorMessage name="roleId" />
            </Text>
          </div>
        )}

        <Flex width={['100%']} justifyContent="center" gap="1rem">
          <Button
            onClick={() => setEditing(null)}
            width={['100%']}
          >
            Volver
          </Button>
          <Button
            rounded={10}
            background={'red'}
            color={'white'}
            type="submit"
            width={['100%']}
          >
            Editar
          </Button>
        </Flex>
      </Flex>
    </FormikProvider>
  );
}

export default UserEditionForm;
