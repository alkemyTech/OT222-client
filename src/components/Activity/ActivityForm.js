import React, { useState, useEffect } from 'react';
import AuthorizationService from '../../services/authorization';
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { Flex, Input, Button, Stack, Text } from '@chakra-ui/react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Yup from 'yup';
import { confirmation, error } from '../../services/alerts';

function ActivityForm({ values }) {
  const { name, content, id } = values || {
    name: '',
    content: '',
  };
  const initialValues = {
    name,
    content,
    image: '',
  };

  const [isEditionForm, setIsEditionForm] = useState(false);

  useEffect(() => {
    setIsEditionForm(!!values);
  }, [values]);

  const inputHandler = (event, editor) => {
    formik.setFieldValue('content', editor.getData());
  };

  const FILE_SIZE = 200000; //100000 is 1 mb
  const SUPPORTED_FORMATS = ['jpg', 'image/jpeg', 'jpeg', 'image/jpg'];

  const validationSchema = Yup.object({
    name: Yup.string().required('Por favor escribe un nombre'),
    image: Yup.mixed()
      .required('Por favor ingrese una imagen')
      .test(
        'fileFormat',
        'Formato no soportado, los formatos permitidos son jpg o jpeg',
        value => {
          if (value) return SUPPORTED_FORMATS.includes(value.type);
        }
      )
      .test(
        'fileSize',
        'La imagen es muy grande, el tamaño maximo es de 200 mb',
        value => !value || (value && value.size <= FILE_SIZE)
      ),
    content: Yup.string().required('Por favor escribe un contenido'),
  });

  const onSubmit = (values, actions) => {
    AuthorizationService.post(
      'files',
      { file: values.image },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
      .then(res => {
        values.image = res.data.data.Location;

        if (isEditionForm) {
          AuthorizationService.put(`/activities/${id}`, {
            name: values.name,
            content: values.content,
            image: values.image,
          })
            .then(res => {
              confirmation('Has editado la Actividad!');
            })
            .catch(err => {
              error('Error', err.response.data.errors[0].msg);
            });
        } else {
          AuthorizationService.post('/activities', {
            name: values.name,
            content: values.content,
            image: values.image,
          })
            .then(res => {
              confirmation(`Has creado una Actividad!`);
            })
            .catch(err => {
              error('Error', err.response.data.errors[0].msg);
            });
        }
      })
      .catch(err => {
        error('Error', err);
      });
    {
      actions.resetForm();
    }
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
        width={{ base: '90%', sm: '90%', md: '50%', lg: '50%' }}
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

        <Flex flexDirection={'column'}>
          <label htmlFor="image">Imagen</label>
          <br />
          <input
            type="file"
            onChange={event => {
              formik.setFieldValue('image', event.target.files[0]);
            }}
          />
          <Text color="red">
            <ErrorMessage name="image" />
          </Text>
        </Flex>

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
            background={'red'}
            size={['lg', 'md']}
            color={'white'}
            fontSize={['xs', 'md']}
            type="submit"
          >
            {`${editOrCreate}`}
          </Button>
        </Stack>
      </Flex>
    </FormikProvider>
  );
}

export default ActivityForm;
