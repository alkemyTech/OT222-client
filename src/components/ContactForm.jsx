import React, { useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Flex, Input, Textarea, Button, Stack } from '@chakra-ui/react';
import { confirmation, error } from '../services/alerts';
import LoaderSpinner from './LoaderSpinner';

const ContactForm = () => {
  const messageArray = [];
  const [loading, setLoading] = useState(false);

  if (loading) return <LoaderSpinner></LoaderSpinner>;

  return (
    <>
      <Flex heigth={'100%'} width={'70%'} ml={14} mt={30}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            messageText: '',
          }}
          validate={values => {
            let error = {};
            //Name validation
            if (!values.name) {
              error.name = 'Por favor ingresa un nombre';
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.name)) {
              error.name = 'Este campo no debe tener numeros';
            }
            //email validation
            if (!values.email) {
              error.email = 'Por favor ingresa un email';
            } else if (
              !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
                values.email
              )
            ) {
              error.email = 'Este campo debe contar con un @ y un .com';
            }
            //text validation
            if (!values.messageText) {
              error.messageText = 'Por favor escribe tu consulta';
            }
            return error;
          }}
          onSubmit={async (values, { resetForm }) => {
            setLoading(true);
            let messageObject = {
              name: values.name,
              email: values.email,
              messageText: values.messageText,
            };
            messageArray.push(messageObject);
            console.log(messageObject);
            resetForm();
            axios
              .post(`${process.env.REACT_APP_SERVER_BASE_URL}/mail`, {
                to: values.email,
                from: process.env.REACT_APP_SENDGRID_EMAIL,
                subject: 'Gracias por contactarnos',
                text: `Hola ${values.name}, gracias por contactarnos, en breve nos comunicaremos contigo.\n\nSomosMás Team`,
              })
              .then(() => {
                confirmation('Mensaje enviado correctamente');
                setLoading(false);
              })
              .catch(err => {
                console.log(err);
                error('Error', 'Ha ocurrido un error al enviar el mensaje');
                setLoading(false);
              });
            //changeForm(true);
            //  setTimeout(()=>changeForm(false,500000))
              try {
                axios.post(`${process.env.REACT_APP_SERVER_BASE_URL}/contacts`, {
                  headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                  },
                  messageObject
                })
              } catch (error) {
                console.log(error)
              }
          }}
        >
          {({ errors }) => (
            <Flex
              as={Form}
              className="form"
              flexDirection={'column'}
              gap={'5px'}
              width={'80%'}
              ml={'5%'}
            >
              <Flex fontWeight={'bold'} fontSize={'24px'}>
                ¡Contactate con nosotros!
              </Flex>

              <div>
                <label htmlFor="name"></label>
                <Field
                  as={Input}
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Nombre y Apellido"
                />

                <ErrorMessage
                  name="name"
                  component={() => <div className="error">{errors.name}</div>}
                />
              </div>

              <div>
                <label htmlFor="email"></label>
                <Field
                  as={Input}
                  type="email"
                  name="email"
                  placeholder="Email"
                  id="email"
                />

                <ErrorMessage
                  name="email"
                  component={() => <div className="error">{errors.email}</div>}
                />
              </div>

              <div>
                <Field
                  as={Textarea}
                  name="messageText"
                  placeholder="Escribe tu consulta..."
                />
                <ErrorMessage
                  name="messageText"
                  component={() => (
                    <div className="error">{errors.messageText}</div>
                  )}
                />
              </div>
              <Stack width={['40%']}>
                <Button
                  mt={5}
                  rounded={10}
                  background={'#0038FF'}
                  size={['lg', 'md']}
                  color={'white'}
                  fontSize={['xs', 'md']}
                  type="submit"
                >
                  Enviar consulta
                </Button>
              </Stack>
            </Flex>
          )}
        </Formik>
      </Flex>
    </>
  );
};

export default ContactForm;
