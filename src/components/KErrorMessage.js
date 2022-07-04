import React from "react";
import {Flex} from '@chakra-ui/react';
import { ErrorMessage } from "formik";

const KErrorMessage = ({ name }) => {
  return (
    <Flex
    color={"red"}>
      <br />
      <ErrorMessage name={name} />
    </Flex>
  );
};

export default KErrorMessage;