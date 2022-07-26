import React, { useState, useEffect } from 'react';
import AuthorizationService from '../../services/authorization';
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { Flex, Input, Button, Stack, Text, Image } from '@chakra-ui/react';
import { confirmation, error } from '../../services/alerts';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useNavigate } from 'react-router';

function NewsForm({ values, setEditingNews }) {
  const { name, content, category, id, image } = values || {
    name: '',
    category: '',
    content: '',
  };
  const initialValues = {
    name,
    content,
    category,
    image,
  };

  const [isEditionForm, setIsEditionForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsEditionForm(!!values);
  }, []);

  const FILE_SIZE = 200000; //100000 is 1 mb
  const SUPPORTED_FORMATS = ['jpg', 'image/jpeg', 'jpeg', 'image/jpg'];

  const inputHandler = (event, editor) => {
    formik.setFieldValue('content', editor.getData());
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Por favor escribe un titulo'),
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
    category: Yup.string().required('Por favor escribe una categoria'),
  });

  const onSubmit = (values, actions) => {
    AuthorizationService.post(
      'files',
      { file: values.image, key: values.image.name },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
      .then(res => {
        values.image = res.data.data.Location;

        if (isEditionForm) {
          AuthorizationService.put(`/news/${id}`, {
            name: values.name,
            content: values.content,
            image: values.image,
            category: values.category,
          })
            .then(res => {
              confirmation('Has editado la Novedad!');
              setEditingNews(false);
            })
            .catch(err => {
              error('Error', err.response.data.errors[0].msg);
            });
        } else {
          AuthorizationService.post('/news', {
            name: values.name,
            content: values.content,
            image: values.image,
            category: values.category,
          })
            .then(res => {
              confirmation(`Has creado una Novedad!`);
              navigate('/backoffice/news');
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
        ml={{ base: '30px', sm: '30px', md: '100px', lg: '227px' }}
        width={{ base: '80%', sm: '80%', md: '50%', lg: '50%' }}
        mt={'5%'}
        boxShadow="dark-lg"
        rounded="ms"
        bg="white"
        p={'2%'}
      >
        <Flex fontWeight={'bold'} fontSize={['sm', 'md', 'lg', 'xl']}>
          {`¡${editOrCreate} Novedad!`}
        </Flex>

        <div>
          <label htmlFor="name">Titulo</label>
          <Field as={Input} id="name" type="text" name="name" />
          <Text color="red">
            <ErrorMessage name="name" />
          </Text>
        </div>

        <div>
          <Flex flexDirection={'column'}>
            <label htmlFor="image">Imagen</label>
            {!!isEditionForm && (
              <Image
                width={['20px', '40px', '50px', '50px']}
                height={['20px', '40px', '50px', '50px']}
                mt={'10px'}
                borderRadius={'70%'}
                src={values.image}
                alt={values.name}
              />
            )}
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
          </Flex>
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
            background={'blue'}
            size={['lg', 'md']}
            color={'white'}
            fontSize={['xs', 'xs', 'md', 'md']}
            type="submit"
          >
            {`${editOrCreate}`}
          </Button>
        </Stack>
      </Flex>
      <Flex
        flexDirection={'column'}
        alignItems={'flex-start'}
        pr={{ base: '4px', sm: '238px', md: '468px', lg: '807px' }}
        mt={'5%'}
        ml={{ base: '15px', sm: '15px', md: '100px', lg: '227px' }}
        mb="70px"
      >
        <Link to={'/backoffice/news'}>
          <Button
            background={'red'}
            color={'white'}
            fontWeight={'bold'}
            fontSize={['xs', 'xs', 'md', 'md']}
            borderRadius={'15px'}
            boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
            onClick={() => (!!setEditingNews ? setEditingNews(null) : null)}
          >
            ¡Volver a Novedad!
          </Button>
        </Link>
        <Link to={'/'}>
          <Button
            mt={'20px'}
            fontSize={['xs', 'xs', 'md', 'md']}
            background={'white'}
            boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
            borderRadius={'15px'}
          >
            {' '}
            Ir al inicio
          </Button>
        </Link>
      </Flex>
    </FormikProvider>
  );
}

export default NewsForm;
