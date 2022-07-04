import { Formik, Field, Form } from "formik"
import React from "react"

const validate = values => {
    const errors = {}

    if (!values.firstName) {
        errors.firstName = "Obligatorio"
    } else if (values.firstName.length < 3) {
        errors.firstName = "Debe tener al menos 3 caracteres"
    }

    if (!values.lastName) {
        errors.lastName = "Obligatorio"
    } else if (values.lastName.length < 3) {
        errors.lastName = "Debe tener al menos 3 caracteres"
    }

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

export default function SignUpForm() {

    let form = {}

    return (
        <div>
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
                    <Form>
                        <Field id="firstName" name="firstName" type="text" placeholder="Nombre" />
                        {errors.firstName && touched.firstName && <label htmlFor="firstName">{errors.firstName}</label>}
                        <Field id="lastName" name="lastName" type="text" placeholder="Apellido" />
                        {errors.lastName && touched.lastName && <label htmlFor="lastName">{errors.lastName}</label>}
                        <Field id="email" name="email" type="email" placeholder="Email" />
                        {errors.email && touched.email && <label htmlFor="email">{errors.email}</label>}
                        <Field id="password" name="password" type="password" placeholder="Contraseña" autocomplete="new-password" />
                        {errors.password && touched.password && <label htmlFor="password">{errors.password}</label>}
                        <button type="submit">Registrarme</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}