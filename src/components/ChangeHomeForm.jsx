import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {Flex, Input, Textarea,Button,Stack} from '@chakra-ui/react';




const ChangeHomeForm = () => {

    return(
         <>

         <Flex
          heigth={"100%"}
          width={"70%"}
          ml={14}
          mt={30}
         >
         <Formik
         initialValues={{
            welcomeText: "",
            text: "",
            img:"",
            text2: "",
            img2:"",
            text3: "",
            img3:"",
         }}
         validate={(values)=>{
            let  error={}
            //text validation
            if(!values.text){
                error.text = "Por favor ingresa un texto"
            }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(values.text)){
                error.text = "Este campo no debe tener numeros"
            }

            //welcomeText validation
            if(!values.welcomeText){
               error.messageText = "Por favor un texto de bienvenida"
            }else if(!(values.welcomeText.length > 20)){
                error.welcomeText = "Este campo no pude tener menos de 20 caracteres"
            }

            return error
         }}
         
         onSubmit={(values,{resetForm})=>{
              console.log(values)
               // generar el post con los values en objeto
               // welcometext: "",
               //  slide:{ img: "",
               //          text:""}
               //                
               //  slide2:{ img2: "",
               //          text2:""}
               //
               //  slide3:{ img3: "",
               //          text3:""}
         }}
         >
            {({errors})=>(
                
         <Flex as = {Form} 
         className="form"
         flexDirection={"column"}
         gap={"5px"}
         width={"80%"}
         ml={"5%"}   
         >
          <Flex
           fontWeight={"bold"}
           fontSize={"24px"}
          >
            Cambiar pagina de inicio

          </Flex>


            <div>
                <Field as={Textarea} name= "welcomeText" placeholder= "Escribetexto de bienvenida" />
                <ErrorMessage name="welcomeText" component={()=>(
               <div className="error">{errors.welcomeText}</div>
               )} />
            </div>

            
        
            <Flex
            flexDirection={"column"}
            gap={"10px"}
            >
               <label htmlFor="img"></label>
                <Field as={Input}
                type = "file"
                name= "img"
                accept="image/x-png,image/gif,image/jpeg"
                
                />
               
                <label htmlFor="text"></label>
                <Field as={Input}
                id="text"
                type = "text"
                name= "text"
                placeholder= "descripcion de imagen"
                />

               <ErrorMessage name="text" component={()=>(
                  <div className="error">{errors.text}</div>
               )} /> 

            </Flex>

            <Flex
            flexDirection={"column"}
            gap={"10px"}
            >
               <label htmlFor="img2"></label>
                <Field as={Input}
                type = "file"
                name= "img2"
                accept="image/x-png,image/gif,image/jpeg"
                
                />
               
                <label htmlFor="text2"></label>
                <Field as={Input}
                type = "text"
                name= "text2"
                placeholder= "descripcion de imagen"
                />

               <ErrorMessage name="text" component={()=>(
                  <div className="error">{errors.text}</div>
               )} /> 

            </Flex>

            <Flex
            flexDirection={"column"}
            gap={"10px"}
            >
               <label htmlFor="img3"></label>
                <Field as={Input}
                type = "file"
                name= "img3"
                accept="image/x-png,image/gif,image/jpeg"
                
                />
               
                <label htmlFor="text"></label>
                <Field as={Input}
                type = "text"
                name= "text3"
                placeholder= "descripcion de imagen"
                />

               <ErrorMessage name="text" component={()=>(
                  <div className="error">{errors.text}</div>
               )} /> 

            </Flex>

           
             <Button 
              mt={5}
              size={["lg","md"]}
              background={"red"}
              color={"white"}
              fontSize={["xs","md"]} 
              type="submit">submit
              </Button>
      
          

         </Flex>
            )}

         </Formik>

         </Flex>
         </>
      )
  }
  
  export default ChangeHomeForm;