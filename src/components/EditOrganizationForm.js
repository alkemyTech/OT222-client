import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import {
  Flex,
  Input,
  Button,
  Text,
  useFormControlProps,
} from "@chakra-ui/react";
import * as yup from "yup";
import KErrorMessage from "../components/KErrorMessage";
import BackButton from "./Buttons/BackButton";
import { Link } from 'react-router-dom'
const validationSchema = yup.object({
  name: yup.string().required("Por favor ingresa el nombre de la organizacion"),

  logo: yup.mixed().required("Por favor ingresa el logo de la organizacion"),
});

const EditOrganizationForm = () => {
  // para usar en el postde la imagen
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  const postImage = () => {
    var formdata = new FormData();
    formdata.append("file", file, fileName);
    formdata.append("key", fileName);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch("http://localhost:3001/files", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };
  return (
    <Flex flexDirection={"column"}>
      <Flex justify={"flex-end"}>
        <Link to={"/backoffice"}>
          <BackButton />
        </Link>
      </Flex>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: "",
          logo: "",
        }}
        onSubmit={(values) => {
          console.log(values);
          postImage();
        }}
      >
        {(props) => (
          <Flex
            as={Form}
            className="form"
            flexDirection={"column"}
            width={"60%"}
            ml={"5%"}
            mb={30}
            gap={"5"}
          >
            <Text
              fontSize={["20px", "20px", "24px"]}
              fontWeight={"bold"}
              color={"red"}
            >
              {" "}
              Formulario para cambiar datos de organizacion
            </Text>

            <Field
              as={Input}
              type="text"
              name="name"
              placeholder="Nombre de la Organizacion"
            />
            <KErrorMessage name="name" />

            <Field
              as={Input}
              type="file"
              name="logo"
              accept="image/x-png,image/gif,image/jpeg"
              onChange={(e) => {
                console.log(e.currentTarget.files[0]);
                setFile(e.currentTarget.files[0]);
                setFileName(e.currentTarget.files[0].name);
                props.handleChange(e);
              }}
            />
            <KErrorMessage name="logo" />

            <Button background={"red"} color={"white"} type="submit">
              Submit
            </Button>
          </Flex>
        )}
      </Formik>
    </Flex>
  );
};

export default EditOrganizationForm;
