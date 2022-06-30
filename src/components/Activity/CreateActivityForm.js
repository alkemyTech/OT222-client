import React, { useState } from 'react';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  FormikProvider,
  useFormik,
} from 'formik';
import { Flex, Input, Button, Stack } from '@chakra-ui/react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Yup from 'yup';

function CreateActivityForm() {
  const messageArray = [];
  const [ckData, setCkData] = useState('');

  const initialValues = {
    name: '',
    content: '',
  };

  const inputHandler = (event, editor) => {
    formik.setFieldValue('content', editor.getData());
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Por favor escribe un nombre'),
    content: Yup.string().required('Por favor escribe un contenido'),
  });

  const onSubmit = (values, actions) => {
    console.log(values);
  };

  const formik = useFormik({ initialValues, onSubmit, validationSchema });

  return (
    <FormikProvider value={formik}>
      <Flex
        as={Form}
        className="form"
        flexDirection={'column'}
        gap={'5px'}
        width={'80%'}
        ml={'5%'}
      >
        <Flex fontWeight={'bold'} fontSize={'24px'}>
          ¡Añadir una Actividad!
        </Flex>

        <div>
          <label htmlFor="name">Nombre</label>
          <Field
            as={Input}
            id="title"
            type="text"
            name="name"
            boxShadow="xl"
            rounded="ms"
            bg="white"
          />
          <ErrorMessage name="name" />
        </div>

        <div>
          <label htmlFor="content">Contenido</label>
          <CKEditor
            editor={ClassicEditor}
            config={{
              toolbar: [
                'heading',
                '|',
                'bold',
                'italic',
                'bulletedList',
                'numberedList',
                'blockQuote',
              ],
            }}
            onChange={inputHandler}
          />
          <ErrorMessage name="content" />
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
            Crear Actividad
          </Button>
        </Stack>
      </Flex>
    </FormikProvider>
  );
}

export default CreateActivityForm;
