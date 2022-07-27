import React, { useState, useEffect } from 'react';
import AuthorizationService from '../../services/authorization';
import { ErrorMessage, Field, Form, FormikProvider, useFormik } from 'formik';
import { Flex, Input, Button, Stack, Image, Text } from '@chakra-ui/react';
import { confirmation, error } from '../../services/alerts';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import * as Yup from 'yup';

function TestimonialForm({ values, setEditing }) {
  const { name, image, content, id } = values || {
    name: '',
    content: '',
  };
  const initialValues = {
    name,
    content,
    image: '',
  };

  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditionForm, setIsEditionForm] = useState(false);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState();

  const navigate = useNavigate();

  var myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${localStorage.getItem('token')}`);

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  const fetchUser = () => {
    fetch(process.env.REACT_APP_SERVER_BASE_URL + '/auth/me', requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.roleId === 1) {
          setIsAdmin(true);
        }
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    setIsEditionForm(!!values);
    fetchUser();
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

  const postImage = () => {
    var formdata = new FormData();
    formdata.append('file', file, fileName);
    formdata.append('key', fileName);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };

    fetch(process.env.REACT_APP_SERVER_BASE_URL + '/files', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  };

  const postEdit = values => {
    if (isEditionForm) {
      AuthorizationService.put(`/testimonials/${id}`, {
        name: values.name,
        content: values.content,
        image: fileName,
      })
        .then(res => {
          confirmation('Has editado el testimonio!');
          setEditing(false);
        })
        .catch(err => {
          error('Error', err.response.data.errors[0].msg);
        });
    } else {
      AuthorizationService.post('/testimonials', {
        name: values.name,
        content: values.content,
        image: fileName,
      })
        .then(res => {
          confirmation(`Has creado el testimonio!`);
        })
        .catch(err => {
          error('Error', err.response.data.errors[0].msg);
        });
    }
    if (!setEditing) {
      navigate(`${!!isAdmin ? '/backoffice' : ''}/testimonials`);
    } else {
      setEditing(null);
    }
  };
  const onSubmit = (values, actions) => {
    postImage();
    postEdit(values);
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
        mt="35px"
        ml={{ base: '30px', sm: '30px', md: '100px', lg: '227px' }}
        width={{ base: '80%', sm: '80%', md: '50%', lg: '50%' }}
        boxShadow="dark-lg"
        rounded="ms"
        bg="white"
        p={'2%'}
      >
        <Flex fontWeight={'bold'} fontSize={['sm', 'md', 'lg', 'xl']}>
          {`¡${editOrCreate} Testimonio!`}
        </Flex>

        <div>
          <label htmlFor="name">Nombre</label>
          <Field as={Input} id="name" type="text" name="name" />
          <Text color="red">
            <ErrorMessage name="name" />
          </Text>
        </div>

        <Flex flexDirection={'column'}>
          <label htmlFor="image">Imagen</label>
          {!!values && (
            <Image
              width={['20px', '40px', '50px', '50px']}
              height={['20px', '40px', '50px', '50px']}
              mb={'10px'}
              mt={'10px'}
              borderRadius={'20%'}
              src={image}
            />
          )}
          <input
            type="file"
            onChange={event => {
              formik.setFieldValue('image', event.target.files[0]);
              setFile(event.currentTarget.files[0]);
              setFileName(event.currentTarget.files[0].name);
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
            background={'yellow'}
            fontSize={['xs', 'xs', 'md', 'md']}
            color={'black'}
            type="submit"
          >
            {`${editOrCreate} `}
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
        <Link to={'/testimonials'}>
          <Button
            background={'red'}
            color={'white'}
            fontWeight={'bold'}
            fontSize={['xs', 'xs', 'md', 'md']}
            borderRadius={'15px'}
            boxShadow={'0px 4px 4px rgba(0, 0, 0, 0.25)'}
            onClick={() => (!!setEditing ? setEditing(null) : null)}
          >
            ¡Volver a Testimonios!
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

export default TestimonialForm;
