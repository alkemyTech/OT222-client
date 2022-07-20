import React from "react";
import { Formik, Field, Form } from "formik";
import { Input, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import LoginApi from "../../services/LoginApi";

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = "Obligatorio";
  } else if (
    !/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(
      values.email
    )
  ) {
    errors.email = "Direccción de correo inválida";
  }

  if (!values.password) {
    errors.password = "Obligatorio";
  } else if (values.password.length < 6) {
    errors.password = "Debe tener al menos 6 caracteres";
  }

  return errors;
};

export default function LoginForm() {
  const navigate = useNavigate();

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validate={validate}
        onSubmit={(values) => {
          LoginApi(values, navigate);
        }}
      >
        {({ errors, touched }) => (
          <Flex flexDirection={"column"} gap={"10px"} as={Form} maxWidth="100%">
            <div>
              <Text variant={"login"}>Bienvenido</Text>
              <Heading mb="15px" size={["sm", "md", "lg"]} variant={"login"}>
                Inicia sesión en tu cuenta!
              </Heading>
            </div>

            <Input
              as={Field}
              mb="10px"
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              variant={"login"}
            />
            <Text color="blue">
              {errors.email && touched.email && (
                <label htmlFor="email">{errors.email}</label>
              )}
            </Text>

            <Input
              as={Field}
              id="password"
              mb="10px"
              name="password"
              type="password"
              placeholder="Contraseña"
              autoComplete="current-password"
              variant={"login"}
            />
            <Text color="blue">
              {errors.password && touched.password && (
                <label htmlFor="password">{errors.password}</label>
              )}
            </Text>

            <Button
              type="submit"
              mb="10px"
              fontSize={{ base: "15px", md: "20px", lg: "25px" }}
              variant={"login"}
            >
              Inicia sesión
            </Button>

            <Flex justifyContent="center" mt="30px" gap="4px">
              <Text>¿No tienes una cuenta?</Text>
              <Text
                color="primary"
                _hover={{ cursor: "pointer" }}
                onClick={() => navigate("/register")}
              >
                Registrate
              </Text>
            </Flex>
          </Flex>
        )}
      </Formik>
    </>
  );
}
