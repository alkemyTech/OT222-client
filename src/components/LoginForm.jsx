import { Formik, Field, Form } from "formik"
import React from "react"

const validate = values => {
    const errors = {}

    if (!values.email) {
        errors.email = "Obligatorio"
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
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
                        <p>Bienvenido</p>
                        <h3>Inicia sesión en tu cuenta!</h3>
                        <Field id="email" name="email" type="email" placeholder="Email" />
                        {errors.email && touched.email && <label htmlFor="email">{errors.email}</label>}
                        <Field id="password" name="password" type="password" placeholder="Contraseña" autocomplete="current-password" />
                        {errors.password && touched.password && <label htmlFor="password">{errors.password}</label>}
                        <button type="submit">Inicia sesión</button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}