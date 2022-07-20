import React, { useState, useEffect } from 'react';
import AuthorizationService from '../../services/authorization';
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { Flex, Input, Button, Stack, Text } from '@chakra-ui/react';
import { confirmation, error } from '../../services/alerts';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as Yup from 'yup';

function TestimonialForm({ values }) {
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
  }, []);

  const FILE_SIZE = 200000; //100000 is 1 mb
  const SUPPORTED_FORMATS = ['jpg', 'image/jpeg', 'jpeg', 'image/jpg'];

  const inputHandler = (event, editor) => {
    formik.setFieldValue('content', editor.getData());
  };

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
          AuthorizationService.put(`/testimonials/${id}`, {
            name: values.name,
            content: values.content,
            image: values.image,
          })
            .then(res => {
              confirmation('Has editado el testimonio!');
            })
            .catch(err => {
              error('Error', err.response.data.errors[0].msg);
            });
        } else {
          AuthorizationService.post('/testimonials', {
            name: values.name,
            content: values.content,
            image: values.image,
          })
            .then(res => {
              confirmation(`Has creado el testimonio!`);
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
        width={'50%'}
        mb={'20px'}
        boxShadow="dark-lg"
        rounded="ms"
        bg="white"
        p={'2%'}
      >
        <Flex fontWeight={'bold'} fontSize={'24px'}>
          {`¡${editOrCreate} Testimonio!`}
        </Flex>

        <div>
          <label htmlFor="name">Nombre</label>
          <Field as={Input} id="name" type="text" name="name" />
          <Text color="red">
            <ErrorMessage name="name" />
          </Text>
        </div>

        <div>
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
            {`${editOrCreate} `}
          </Button>
        </Stack>
      </Flex>
    </FormikProvider>
  );
}

export default TestimonialForm;
