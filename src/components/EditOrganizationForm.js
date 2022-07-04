import React from "react";
import { Formik, Form, Field }from "formik";
import {Flex, Input,Button,Text} from '@chakra-ui/react';
import * as yup from "yup";
import KErrorMessage from "../components/KErrorMessage"  

const validationSchema = yup.object({
  name: yup
  .string()
  .required("Por favor ingresa el nombre de la organizacion"),

  logo: yup
  .mixed()
  .required("Por favor ingresa el logo de la organizacion"),
  
});  

const EditOrganizationForm = () =>{    
    return(    
        <Flex
        flexDirection={"column"}
        >
        <Formik
          validationSchema={validationSchema}
          initialValues={{
           name:"",
           logo:"",
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {() => (
            <Flex as={Form}
            className="form"
            flexDirection={"column"}
            width={"60%"}
            ml={"5%"}
            gap={"5"}
            >
                <Text
                fontSize={["20px","20px","24px"]}
                fontWeight={"bold"}
                color={"red"}
                > Formulario para cambiar datos de organizacion</Text>

                <Field as={Input}
                type = "text"
                name= "name"
                placeholder= "Nombre de la Organizacion"
                />
                <KErrorMessage name="name"/>


               <Field as={Input}
                type = "file"
                name= "logo"
                accept="image/x-png,image/gif,image/jpeg"
                />
                <KErrorMessage name="logo"/>

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

export default EditOrganizationForm