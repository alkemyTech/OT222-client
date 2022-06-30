import React from 'react';
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { Flex, Input, Button, Stack, Text } from '@chakra-ui/react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Yup from 'yup';

function NewsForm({ values }) {
  const { name, lastname, role } = values || {
    name: '',
    lastname: '',
    role: '',
  };
  const initialValues = {
    name: '',
    lastname: '',
    role: '',
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

  const onSubmit = (values, actions) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  const editOrCreate = !!values ? 'Editar' : 'Crear';

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
          {`¡${editOrCreate} Novedad!`}
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
          <br />
          <input
            type="file"
            accept="image/x-png,image/gif,image/jpeg"
            onChange={event => {
              formik.setFieldValue('image', event.target.files[0]);
            }}
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
              initialData: content,
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
            {`${editOrCreate} Novedad`}
          </Button>
        </Stack>
      </Flex>
    </FormikProvider>
  );
}

export default NewsForm;
