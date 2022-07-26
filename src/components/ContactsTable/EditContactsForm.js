import React, {useState} from "react";
import { Formik, Form, Field }from "formik";
import {Flex, Input,Button,Text,Textarea} from '@chakra-ui/react';
import axios from '../../services/authorization/index';
import * as yup from "yup";
import KErrorMessage from "../../components/KErrorMessage";

const validationSchema = yup.object({
  name: yup
  .string()
  .required("Por favor ingresa el nombre y apellido"),

  phone: yup
  .string()
  .required("Por favor ingresa el telefono"),

  email: yup
  .string()
  .required("Por favor ingresa el email")
  .email("por favor ingresa un email valido"),

  message: yup
    .string()
    .required("Por favor ingresa el mensaje")


  
});  


const EditandCreateContactForm = ( {type, element}) =>{ 
   const [contacto, setContacto] = useState();

   const getContact = async () => {
        axios
        .get(`${process.env.REACT_APP_SERVER_BASE_URL}/contacts/${element.id}`)
        .then(res => {
            setContacto(res.data);
            console.log(res.data)
        })
        .catch(err => console.log(err));
    }
    const createContact = async () => {
        axios
        .post(`${process.env.REACT_APP_SERVER_BASE_URL}/contacts/`)
        .then(res => {
            console.log(res.data)
        })
        .catch(err => console.log(err));
    }

   const title = ()=>{
    if(type === "edit"){
      return "Editar Contacto"
    }else{
      return "Agregar Contacto"
    }
  }

  const values = () =>{
    if(type === "edit"){
      return {
        name: contacto.name,
        phone: contacto.phone,
        email: contacto.email,
        message: contacto.message
      }
    }else{
      return {
        name: "",
        phone: "",
        email: "",
        message: ""
      }
    }
  }
    return(    
        <Flex
        flexDirection={"column"}
        >
        <Formik
          validationSchema={validationSchema}
          initialValues={
            values()
          }

          onSubmit={(values) => {
            console.log(values);
            if(type === "edit"){
                axios
                .put(`${process.env.REACT_APP_SERVER_BASE_URL}/contacts/${element.id}`, values)
                .then(res => {
                    console.log(res.data)
                }).catch(err => console.log(err));
            }else(
                createContact()
            )
          }}
        >
          {() => (
            <Flex as={Form}
            className="form"
            flexDirection={"column"}
            width={"60%"}
            ml={"5%"}
            mb={30}
            gap={"5"}
            >
                <Text
                fontSize={["20px","20px","24px"]}
                fontWeight={"bold"}
                color={"red"}
                > {title()} </Text>
                <label htmlFor="name"> Nombre y Apellido</label>
                <Field as={Input}
                type = "text"
                name= "name"
                placeholder= "Nombre y Apellido"
                />
                <KErrorMessage name="name"/>

                <label htmlFor="phone"> Telefono</label>
               <Field as={Input}
                type = "text"
                name= "phone"
                placeholder= "+54 9 154 554 554"
                />
                <KErrorMessage name="phone"/>

                <label htmlFor="phone"> Email</label>
               <Field as={Input}
                type = "email"
                name= "email"
                placeholder= "email@email.com"
                />
                <KErrorMessage name="email"/>

                <label htmlFor="phone"> Mensaje</label>
               <Field as={Textarea}
                type = "text"
                name= "message"
                placeholder= "deja aqui tu mensaje"
                />
                <KErrorMessage name="message"/>

              <Button 
              background={"red"}
              color={"white"}
              type="submit">Submit</Button>
            </Flex>
          )}
        </Formik>
      </Flex>
    )
}

export default EditandCreateContactForm