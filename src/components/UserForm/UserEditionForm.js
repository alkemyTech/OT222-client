import React, { useState, useEffect } from 'react';

import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { Flex, Input, Button, Stack, Text } from '@chakra-ui/react';
import * as Yup from 'yup';

function UserEditionForm({ values }) {
  const { name, lastName, roleId, isAdmin } = values;
  const initialValues = {
    name,
    lastName,
    ...(isAdmin && { roleId }),
  };

  const [isAdminUser, setisAdminUser] = useState(false);

  useEffect(() => {
    setisAdminUser(!!isAdmin);
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required('Por favor escribe tu nombre'),
    lastName: Yup.string().required('Por favor escribe tu Apellido'),
    ...(!!isAdmin && {
      roleId: Yup.number().required('Por favor escribe un rol'),
    }),
  });

  const onSubmit = (values, actions) => {
    actions.resetForm();
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
        width={'40%'}
        ml={'5%'}
        mt={'3%'}
        mb={'10%'}
        boxShadow="dark-lg"
        rounded="ms"
        bg="white"
        p={'2%'}
      >
        <Flex fontWeight={'bold'} fontSize={'24px'}>
          {`!Editar ${profileOruser}!`}
        </Flex>

        <div>
          <label htmlFor="name">Nombre</label>
          <Field as={Input} id="title" type="text" name="name" />
          <Text color="red">
            <ErrorMessage name="name" />
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
            <label htmlFor="roleId">Role</label>
            <Field as={Input} id="title" type="text" name="roleId" />
            <Text color="red">
              <ErrorMessage name="roleId" />
            </Text>
          </div>
        )}

        <Stack width={['40%']}>
          <Button
            mt={5}
            rounded={10}
            background={'red'}
            size={['lg', 'md']}
            color={'white'}
            fontSize={['xs', 'md']}
            type="submit"
          >
            Editar
          </Button>
        </Stack>
      </Flex>
    </FormikProvider>
  );
}

export default UserEditionForm;
