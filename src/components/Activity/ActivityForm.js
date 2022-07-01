import React, { useState, useEffect } from 'react';
import AuthorizationService from '../../services/authorization';
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { Flex, Input, Button, Stack, Text } from '@chakra-ui/react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Yup from 'yup';

function ActivityForm({ values }) {
  const { name, content, id } = values || {
    name: '',
    content: '',
  };
  const initialValues = {
    name,
    content,
  };

  const [isEditionForm, setIsEditionForm] = useState(false);

  useEffect(() => {
    setIsEditionForm(!!values);
  }, []);

  const inputHandler = (event, editor) => {
    formik.setFieldValue('content', editor.getData());
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Por favor escribe un nombre'),
    content: Yup.string().required('Por favor escribe un contenido'),
  });

  const onSubmit = (values, actions) => {
    try {
      if (isEditionForm) {
        AuthorizationService.patch(`/activities/${id}`, {
          values,
        });
      } else {
        AuthorizationService.post(`/activities`, {
          values,
        });
      }
    } catch (error) {
      alert(error);
    }
    actions.resetForm();
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });
  const editOrCreate = isEditionForm ? 'Editar' : 'Crear';

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
          {`¡${editOrCreate} Actividad!`}
        </Flex>

        <div>
          <label htmlFor="name">Nombre</label>
          <Field as={Input} id="title" type="text" name="name" />
          <Text color="red">
            <ErrorMessage name="name" />
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
            {`${editOrCreate} Actividad`}
          </Button>
        </Stack>
      </Flex>
    </FormikProvider>
  );
}

export default ActivityForm;
