import React from "react"
import { Formik, Field, Form } from "formik"
import { Input, Button, Flex, Heading, Text } from '@chakra-ui/react'
import { useNavigate } from "react-router"

const validate = values => {
    const errors = {}

    if (!values.email) {
        errors.email = "Obligatorio"
    } else if (!/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/i.test(values.email)) {
        errors.email = "Direccción de correo inválida"
    }

    if (!values.password) {
        errors.password = "Obligatorio"
    } else if (values.password.length < 6) {
        errors.password = "Debe tener al menos 6 caracteres"
    }

    return errors
}

export default function LoginForm() {

    let form = {}
    const navigate = useNavigate()

    return (
        <>
            <Formik
                initialValues={{
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: ""
                }}
                validate={validate}
                onSubmit={values => {
                    form = values
                    console.log(form)
                }}
            >
                {({ errors, touched }) => (
                    <Flex flexDirection={"column"} gap={"10px"} as={Form} maxWidth="100%" >
                        <div>
                            <Text variant={"login"}>Bienvenido</Text>
                            <Heading variant={"login"}>Inicia sesión en tu cuenta!</Heading>
                        </div>
                        <Input as={Field} id="email" name="email" type="email" placeholder="Email" variant={"login"} />
                        {errors.email && touched.email && <label htmlFor="email">{errors.email}</label>}
                        <Input as={Field} id="password" name="password" type="password" placeholder="Contraseña" autoComplete="current-password" variant={"login"} />
                        {errors.password && touched.password && <label htmlFor="password">{errors.password}</label>}
                        <Button type="submit" variant={"login"}>Inicia sesión</Button>
                        <Flex justifyContent="center" gap="4px">
                            <Text>¿No tienes una cuenta?</Text>
                            <Text color="primary" _hover={{ cursor: "pointer" }} onClick={() => navigate("/register")}>Registrate</Text>
                        </Flex>

                    </Flex>
                )}
            </Formik>
        </>
    )
}