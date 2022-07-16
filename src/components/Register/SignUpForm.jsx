import React from 'react';
import { Formik, Field, Form } from 'formik';
import { Input, Button, Flex, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router';
import RegisterApi from '../../Services/RegisterApi';
import axios from "axios";

const validate = values => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "Obligatorio";
  } else if (values.firstName.length < 3) {
    errors.firstName = "Debe tener al menos 3 caracteres";
  }

  if (!values.lastName) {
    errors.lastName = "Obligatorio";
  } else if (values.lastName.length < 3) {
    errors.lastName = "Debe tener al menos 3 caracteres";
  }

  if (!values.email) {
    errors.email = "Obligatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Direccción de correo inválida";
  }

  if (!values.password) {
    errors.password = 'Obligatorio';
  } else if (values.password.length < 8) {
    errors.password = 'Debe tener al menos 8 caracteres';
  }

  return errors;
};
export default function SignUpForm() {
  const navigate = useNavigate();
  const onSubmit = (values) => {
    const userSaved = RegisterApi(values, navigate).then(async (res) => {
      const user = await axios.get(
        `${process.env.REACT_APP_SERVER_BASE_URL}/auth/me`,
        {
          headers: {
            authorization: res.data.token,
          },
        }
      );
      window.location.reload();
    });
  };
  return (
    <>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        }}
        validate={validate}
        onSubmit={(values) => {
          onSubmit(values);
        }}
      >
        {({ errors, touched }) => (
          <Flex flexDirection={"column"} gap={"10px"} as={Form} maxWidth="100%">
            <div>
              <Text variant={'login'}>Bienvenido</Text>
              <Heading size={['md', 'md', 'lg']} variant={'login'}>
                Registrarse
              </Heading>
            </div>
            <Input
              as={Field}
              variant="login"
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Nombre"
            />
            <Text color="blue">
              {errors.firstName && touched.firstName && (
                <label htmlFor="firstName">{errors.firstName}</label>
              )}
            </Text>

            <Input
              as={Field}
              variant="login"
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Apellido"
            />
            <Text color="blue">
              {errors.lastName && touched.lastName && (
                <label htmlFor="lastName">{errors.lastName}</label>
              )}
            </Text>

            <Input
              as={Field}
              variant="login"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
            />
            <Text color="blue">
              {errors.email && touched.email && (
                <label htmlFor="email">{errors.email}</label>
              )}
            </Text>

            <Input
              as={Field}
              variant="login"
              id="password"
              name="password"
              type="password"
              placeholder="Contraseña"
              autoComplete="new-password"
            />
            <Text color="blue">
              {errors.password && touched.password && (
                <label htmlFor="password">{errors.password}</label>
              )}
            </Text>

            <Button
              fontSize={{ base: '15px', md: '20px', lg: '25px' }}
              variant={'login'}
              type="submit"
            >
              Registrarme
            </Button>
            <Flex justifyContent="center" mt="30px" gap="4px">
              <Text fontSize={{ base: '15px', md: '15px', lg: '20px' }}>
                ¿Ya tienes una cuenta?
              </Text>
              <Text
                fontSize={{ base: '15px', md: '15px', lg: '20px' }}
                color="primary"
                _hover={{ cursor: "pointer" }}
                onClick={() => navigate("/login")}
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
