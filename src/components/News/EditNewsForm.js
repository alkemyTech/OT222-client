import React from 'react';
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { Flex, Input, Button, Stack, Text } from '@chakra-ui/react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Yup from 'yup';

function EditNewsForm() {
  const initialValues = {
    title: '',
    image: '',
    content: '',
    category: '',
  };

  const inputHandler = (event, editor) => {
    formik.setFieldValue('content', editor.getData());
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Por favor escribe un titulo'),
    image: Yup.mixed().required('Por favor inserte una imagen relacionada'),
    content: Yup.string().required('Por favor escribe un contenido'),
    category: Yup.string().required('Por favor escribe una categoria'),
  });

  const onSubmit = (values, actions) => {};

  const formik = useFormik({ initialValues, onSubmit, validationSchema });

  return (
    <FormikProvider value={formik}>
      <Flex
        as={Form}
        className="form"
        flexDirection={'column'}
        gap={'20px'}
        width={'50%'}
        ml={'5%'}
        mt={'3%'}
        mb={'10%'}
        boxShadow="dark-lg"
        rounded="ms"
        bg="white"
        p={'2%'}
      >
        <Flex fontWeight={'bold'} fontSize={'24px'}>
          ¡Editar Novedad!
        </Flex>

        <div>
          <label htmlFor="title">Titulo</label>
          <Field as={Input} id="title" type="text" name="title" />
          <Text color="red">
            <ErrorMessage name="title" />
          </Text>
        </div>

        <div>
          <label htmlFor="image">Imagen</label>
          <Field
            size={'1'}
            as={Input}
            id="title"
            type="file"
            name="image"
            accept="image/x-png,image/gif,image/jpeg"
          />
          <Text color="red">
            <ErrorMessage name="image" />
          </Text>
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
          <Text color="red">
            <ErrorMessage name="content" />
          </Text>
        </div>

        <div>
          <label htmlFor="category">Categoria</label>
          <Field as={Input} id="title" type="text" name="category" />
          <Text color="red">
            <ErrorMessage name="category" />
          </Text>
        </div>

        <Stack width={['40%']}>
          <Button
            mt={5}
            rounded={10}
            background={'yellow'}
            size={['lg', 'md']}
            color={'black'}
            fontSize={['xs', 'md']}
            type="submit"
          >
            Editar Novedad
          </Button>
        </Stack>
      </Flex>
    </FormikProvider>
  );
}

export default EditNewsForm;
