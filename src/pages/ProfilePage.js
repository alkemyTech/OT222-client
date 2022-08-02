import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import BackButton from '../components/Buttons/BackButton';
import {
  Grid,
  Input,
  Text,
  Flex,
  Button,
  FormLabel,
  Box,
  useTheme,
} from '@chakra-ui/react';
import axios from '../services/authorization/index'
import { useSelector, useDispatch } from 'react-redux';
import { confirmation } from '../services/alerts';


const ProfilePage = () => {

  const [user, setUser] = useState({ firstName: '', lastName: '' });
  const [edit, setEdit] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const theme = useTheme();

  useEffect(() => {

    axios.get(process.env.REACT_APP_SERVER_BASE_URL + '/auth/me')
      .then(res => {
        setCurrentUser(res.data.id)
        setUser(res.data)
      })
      .catch(err => console.log(err));

  }, [])

  const handleSubmit = e => {

    axios.post(process.env.REACT_APP_SERVER_BASE_URL + '/auth/edit/' + currentUser, user)
      .then(res => {
        console.log("success")
      })
      .catch(err => console.log(err));

  }

  return (
    <>
      <Flex pt="10px" pr={'10px'} justify={'flex-end'}>
        <Link to={'/backoffice'}>
          <BackButton />
        </Link>
      </Flex>
      <Grid
        w="100vw"
        justifyContent={'center'}
        alignContent="center"
        h={'85vh'}
      >
        <Grid
          w={['100vw', '70vw', '60vw', '40vw']}
          bg="#f7f7f7"
          mt="auto"
          mb="auto"
          gap="3vh"
          pb="5vh"
        >
          <Text justifySelf="center" fontSize={'4xl'}>
            Mis datos
          </Text>

          <Box w={['50vw', '30vw', '20vw']} ml="5vw">
            <FormLabel>Nombre</FormLabel>
            <Input
              bg="#fff"
              id="text"
              placeholder='Nombre'
              value={user.firstName}
              onChange={e => setUser({ ...user, firstName: e.target.value })}
              isDisabled={edit}
            />
          </Box>
          <Box w={['50vw', '30vw', '20vw']} ml="5vw">
            <FormLabel>Apellido</FormLabel>
            <Input
              bg="#fff"
              id="text"
              placeholder='Apellido'
              value={user.lastName}
              onChange={e => setUser({ ...user, lastName: e.target.value })}
              isDisabled={edit}
            />
          </Box>

          <Button
            onClick={() => setEdit(!edit)}
            w={['40vw', '20vw']}
            bg={theme.colors.secondary}
            ml="5vw"
          >
            Modificar datos
          </Button>
          <Button
            onClick={() => {
              handleSubmit();
              confirmation("Datos modificados correctamente");
              setEdit(!edit);
            }}
            w={['40vw', '20vw']}
            bg={theme.colors.tertiary}
            ml="5vw"
          >
            Guardar cambios
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ProfilePage;
