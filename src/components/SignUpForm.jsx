import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Input, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import RegisterApi from '../services/RegisterApi/index';

const validate = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = 'Obligatorio';
  } else if (values.firstName.length < 3) {
    errors.firstName = 'Debe tener al menos 3 caracteres';
  }

  if (!values.lastName) {
    errors.lastName = 'Obligatorio';
  } else if (values.lastName.length < 3) {
    errors.lastName = 'Debe tener al menos 3 caracteres';
  }

  if (!values.email) {
    errors.email = 'Obligatorio';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Direccción de correo inválida';
  }

  if (!values.password) {
    errors.password = 'Obligatorio';
  } else if (values.password.length < 6) {
    errors.password = 'Debe tener al menos 6 caracteres';
  }

  return errors;
};

export default function SignUpForm() {
  const navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={{
          firstName: '',
          lastName: '',
          email: '',
          password: '',
        }}
        validate={validate}
        onSubmit={values => {
          RegisterApi(values, navigate);
        }}
      >
        {({ errors, touched }) => (
          <Flex flexDirection={'column'} gap={'10px'} as={Form} maxWidth="100%">
            <div>
              <Text variant={'login'}>Bienvenido</Text>
              <Heading variant={'login'}>Registrarse</Heading>
            </div>
            <Input
              as={Field}
              variant="login"
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Nombre"
            />
            {errors.firstName && touched.firstName && (
              <label htmlFor="firstName">{errors.firstName}</label>
            )}
            <Input
              as={Field}
              variant="login"
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Apellido"
            />
            {errors.lastName && touched.lastName && (
              <label htmlFor="lastName">{errors.lastName}</label>
            )}
            <Input
              as={Field}
              variant="login"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
            />
            {errors.email && touched.email && (
              <label htmlFor="email">{errors.email}</label>
            )}
            <Input
              as={Field}
              variant="login"
              id="password"
              name="password"
              type="password"
              placeholder="Contraseña"
              autoComplete="new-password"
            />
            {errors.password && touched.password && (
              <label htmlFor="password">{errors.password}</label>
            )}
            <Button variant={'login'} type="submit">
              Registrarme
            </Button>
            <Flex justifyContent="center" gap="4px">
              <Text>¿Ya tienes una cuenta?</Text>
              <Text
                color="primary"
                _hover={{ cursor: 'pointer' }}
                onClick={() => navigate('/login')}
              >
                Iniciar Sesión
              </Text>
            </Flex>
          </Flex>
        )}
      </Formik>
    </>
  );
}
